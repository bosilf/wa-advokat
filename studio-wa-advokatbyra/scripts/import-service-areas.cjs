const fs = require('node:fs');
const {isDeepStrictEqual} = require('node:util');
const {createHash} = require('node:crypto');
const {JSDOM} = require('jsdom');
const {getCliClient} = require('sanity/cli');
const write = process.argv.includes('--write');
const source = process.argv.find(arg => arg.endsWith('.txt'));
const key = text => createHash('sha256').update(text).digest('hex').slice(0,20);
const clean = text => (text || '').replace(/\s+/g,' ').trim();
const document = html => new JSDOM(html).window.document;
async function fetchBytes(url) {
 const response = await fetch(url);
 if (!response.ok) throw Error(`${response.status}: ${url}`);
 return Buffer.from(await response.arrayBuffer());
}
function portable(elements, baseUrl, annotation = 'link') {
 return elements.filter(element => clean(element.textContent)).map((element, index) => {
  const children = [], markDefs = [];
  function walk(node, marks = []) {
   if (node.nodeType === 3) { if(node.textContent) children.push({_type:'span',_key:key(`${index}-${children.length}`),text:node.textContent,marks}); return; }
   if (node.nodeName === 'BR') {children.push({_type:'span',_key:key(`${index}-${children.length}`),text:'\n',marks});return;}
   let next = marks;
   const decorator = {STRONG:'strong',B:'strong',EM:'em',I:'em',U:'underline',S:'strike-through'}[node.nodeName];
   if (decorator) next = [...marks,decorator];
   if (node.nodeName === 'A' && node.getAttribute('href')) {
    const href = new URL(node.getAttribute('href'),baseUrl).href;
    if (!/^(https?:|mailto:|tel:)/.test(href)) throw Error(`Unsupported link: ${href}`);
    const id = key(`${index}-link-${markDefs.length}`);
    markDefs.push({_type:annotation,_key:id,href,...(annotation==='externalLink'?{openInNewTab:node.target==='_blank'}:{})});next=[...marks,id];
   }
   for (const child of node.childNodes) walk(child,next);
  }
  for (const child of element.childNodes) walk(child);
  return {_type:'block',_key:key(`${index}-${element.textContent}`),style:/^H[1-6]$/.test(element.nodeName)?element.nodeName.toLowerCase():'normal',children,markDefs,...(element.matches('li')?{listItem:element.parentElement.nodeName==='OL'?'number':'bullet',level:1}:{})};
 });
}
async function main() {
 if(!source) throw Error('Pass the pasted HTML file');
 const listing = [...document(fs.readFileSync(source,'utf8')).querySelectorAll('.gt3_case_list__item')].map(element=>{
  const img=element.querySelector('img');
  const images=(img?.getAttribute('srcset')||'').split(',').map(s=>s.trim().split(/\s+/)).filter(s=>s[0]).sort((a,b)=>parseInt(b[1]||0)-parseInt(a[1]||0));
  return {title:clean(element.querySelector('.gt3_case_list__cat')?.textContent),url:element.querySelector('a')?.href,excerpt:clean(element.querySelector('.gt3_case_list__desc')?.textContent),image:images[0]?.[0]||img?.src,alt:clean(img?.alt)};
 });
 if(listing.length!==14) throw Error(`Expected 14 areas, got ${listing.length}`);
 const client=getCliClient({apiVersion:'2024-01-01'}).withConfig({useCdn:false,perspective:'raw'});
 const existing=await client.fetch('*[_type in ["service","serviceSection"]]');
 const parents=existing.filter(d=>d._type==='service' && d.slug?.current==='entreprenadjuridik');
 const parent=parents.find(d=>d._id.startsWith('drafts.'))||parents[0];
 if(!parent) throw Error('Entreprenadjuridik parent missing');
 fs.writeFileSync('/tmp/wa-service-areas-backup.json',JSON.stringify(existing,null,2));
 const report=[], preview=[];
 fs.mkdirSync('/tmp/wa-service-areas-source',{recursive:true});
 for(const [index,item] of listing.entries()) {
  const slug=new URL(item.url).pathname.split('/').filter(Boolean).pop();
  const cache=`/tmp/wa-service-areas-source/${slug}.html`;
  if(!fs.existsSync(cache))fs.writeFileSync(cache,await fetchBytes(item.url));
  const page=document(fs.readFileSync(cache,'utf8'));
  const root=page.querySelector('.wpb_text_column')?.closest('.container');
  if(!root) throw Error(`Missing main content: ${item.url}`);
  root.querySelectorAll('.gt3_case_list,script,style,form').forEach(e=>e.remove());
  // Select actual editorial text, excluding nested paragraphs within list items.
  const elements=[...root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,.gt3_custom_text')];
  const selected=elements.filter(e=>!e.parentElement.closest('li') && !(e.matches('.gt3_custom_text') && e.querySelector('h1,h2,h3,h4,h5,h6,p,li')) && clean(e.textContent));
  const firstHeading=selected.findIndex(e=>e.matches('h1'));
  if(firstHeading>=0) selected.splice(firstHeading,1); // Page title is stored separately.
  const split=selected.findIndex(e=>e.matches('h2,h3,h4,h5,h6,.gt3_custom_text'));
  const introElements=split>0?selected.slice(0,split):selected.filter(e=>e.matches('p')).slice(0,1);
  const body=portable(introElements,item.url,'externalLink');
  const remainder=selected.filter(e=>!introElements.includes(e));
  const sections=[];let current;
  for(const element of remainder){
   if(element.matches('h2,h3,h4,h5,h6,.gt3_custom_text')) {if(current && !current.elements.length){current.elements.push(element);}else{current={heading:clean(element.textContent),elements:[]};sections.push(current);}}
   else {if(!current){current={heading:item.title,elements:[]};sections.push(current);}current.elements.push(element);}
  }
  const nonempty=sections.filter(s=>s.elements.length);
  if(!body.length || !nonempty.length)throw Error(`Incomplete content: ${slug}`);
  const data={_type:'serviceSection',title:item.title,slug:{_type:'slug',current:slug},parentService:{_type:'reference',_ref:parent._id.replace(/^drafts\./,'')},excerpt:item.excerpt.length<=220?item.excerpt:item.excerpt.slice(0,217).replace(/\s+\S*$/,'')+'…',body,sections:nonempty.map((s,i)=>({_type:'pageSection',_key:key(`${slug}-${i}`),heading:s.heading,blocks:[{_type:'richTextBlock',_key:key(`${slug}-${i}-text`),content:portable(s.elements,item.url)}]})),experts:parent.experts,sortOrder:(index+1)*10};
  const text=blocks=>blocks.map(b=>clean(b.children.map(c=>c.text).join('')));
  const sectionHeadings=sections.map(s=>s.heading);
  const expected=selected.filter(e=>!sectionHeadings.includes(clean(e.textContent))).map(e=>clean(e.textContent));
  const actual=[...text(body),...nonempty.flatMap(s=>text(portable(s.elements,item.url)))];
  if(JSON.stringify(expected)!==JSON.stringify(actual))throw Error(`Text preservation failed: ${slug}`);
  const links=[...body,...data.sections.flatMap(s=>s.blocks.flatMap(b=>b.content))].flatMap(b=>b.markDefs.map(m=>m.href));
  const previous=existing.find(d=>d._type==='serviceSection' && (d.slug?.current===slug || clean(d.title).toLowerCase()===item.title.toLowerCase()));
  const id=previous?`drafts.${previous._id.replace(/^drafts\./,'')}`:`drafts.imported-wa-service-area-${slug}`;
  // Existing entries are never overwritten by this importer.
  if(previous){report.push({title:item.title,status:'already exists',id:previous._id});continue;}
  if(write){
   const bytes=await fetchBytes(item.image);
   const asset=await client.assets.upload('image',bytes,{filename:new URL(item.image).pathname.split('/').pop(),source:{id:key(item.image),name:'wa-advokat.se',url:item.image}});
   data.image={_type:'image',asset:{_type:'reference',_ref:asset._id},alt:item.alt||item.title};
   const saved=await client.createIfNotExists({_id:id,...data});
   for(const field of Object.keys(data))if(!isDeepStrictEqual(saved[field],data[field]))throw Error(`Saved field mismatch: ${slug}.${field}`);
  }
  preview.push({id,source:item.url,imageSource:item.image,...data});
  report.push({title:item.title,id,status:write?'created draft':'ready',paragraphs:actual.length,sections:data.sections.length,links,image:item.image});
  console.log(`${item.title}: ${report.at(-1).status}, ${actual.length} text blocks, ${links.length} links`);
 }
 fs.writeFileSync('scripts/import-service-areas.preview.json',JSON.stringify(preview,null,2)+'\n');
 fs.writeFileSync('scripts/import-service-areas.report.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({total:report.length,created:report.filter(r=>r.status==='created draft').length,existing:report.filter(r=>r.status==='already exists').length}));
}
main().catch(error=>{console.error(error);process.exitCode=1});
