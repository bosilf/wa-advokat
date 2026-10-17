const fs = require('node:fs');
const {createHash} = require('node:crypto');
const {JSDOM} = require('jsdom');
const {getCliClient} = require('sanity/cli');
const source = process.argv.find(arg=>arg.endsWith('.txt'));
const write = process.argv.includes('--write');
const key = value=>createHash('sha256').update(value).digest('hex').slice(0,20);
const clean = text=>text.replace(/\s+/g,' ').trim();
const doc = html=>new JSDOM(html).window.document;
async function json(url){const r=await fetch(url);if(!r.ok)throw Error(`${r.status}: ${url}`);return r.json();}
function blocks(html){
 const document=doc(html.replace(/\[\/?vc_[^\]]*\]/g,''));
 document.querySelectorAll('script,style').forEach(e=>e.remove());
 const result=[];
 const elements=[...document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,blockquote')].filter(e=>!e.closest('li,blockquote') || e.matches('li,blockquote'));
 for(const element of elements){
  if(element.matches('blockquote') && element.querySelector('p')) continue;
  if(!clean(element.textContent)) continue;
  const markDefs=[],children=[];
  function walk(node,marks=[]){
   if(node.nodeType===3){if(node.textContent)children.push({_type:'span',_key:key(`${result.length}-${children.length}`),text:node.textContent,marks});return;}
   if(node.nodeName==='BR'){children.push({_type:'span',_key:key(`${result.length}-${children.length}`),text:'\n',marks});return;}
   let next=marks;
   const mark={STRONG:'strong',B:'strong',EM:'em',I:'em',U:'underline'}[node.nodeName];
   if(mark)next=[...marks,mark];
   if(node.nodeName==='A' && /^https?:|^mailto:/.test(node.getAttribute('href')||'')){
    const id=key(`${result.length}-link-${markDefs.length}`);markDefs.push({_type:'link',_key:id,href:node.getAttribute('href')});next=[...marks,id];
   }
   for(const child of node.childNodes)walk(child,next);
  }
  for(const child of element.childNodes)walk(child);
  if(!children.length)continue;
  const style=/^H[1-6]$/.test(element.nodeName)?(element.nodeName==='H1'?'h2':element.nodeName.toLowerCase().replace(/h[4-6]/,'h3')):'normal';
  result.push({_type:'block',_key:key(`${result.length}-${element.textContent}`),style,markDefs,children,...(element.matches('li')?{listItem:element.parentElement.nodeName==='OL'?'number':'bullet',level:1}:{})});
 }
 return result;
}
async function main(){
 if(!source)throw Error('Pass the pasted HTML file');
 const previews=[...doc(fs.readFileSync(source,'utf8')).querySelectorAll('.blog_post_preview')].map(e=>{
 const a=e.querySelector('.blogpost_title a');return {title:clean(a.textContent),url:a.href,slug:decodeURIComponent(new URL(a.href).pathname.split('/').filter(Boolean).pop())};});
 const client=getCliClient({apiVersion:'2024-01-01'}).withConfig({useCdn:false,perspective:'raw'});
 const [existing,employees]=await Promise.all([
 client.fetch('*[_type=="article"]{_id,title,"slug":slug.current}'),
 client.fetch('*[_type=="employee" && !(_id in path("drafts.**"))]{_id,firstName,lastName}')]);
 const report=[];
 for(const preview of previews){
  if(existing.some(e=>e.slug===preview.slug || clean(e.title||'').toLowerCase()===preview.title.toLowerCase())){report.push({title:preview.title,status:'already exists'});continue;}
  const posts=await json(`https://wa-advokat.se/wp-json/wp/v2/posts?slug=${encodeURIComponent(preview.slug)}`);
  if(posts.length!==1)throw Error(`Expected one source post for ${preview.slug}`);
  const post=posts[0];
  const body=blocks(post.content.rendered);
  if(!body.length)throw Error(`Empty body: ${preview.slug}`);
  const title=clean(doc(post.title.rendered).body.textContent);
  const intro=clean(doc(post.content.rendered).body.textContent).slice(0,1500).toLowerCase();
  const writers=employees.filter(e=>intro.includes(`${e.firstName} ${e.lastName}`.toLowerCase())).map(e=>({_type:'reference',_key:key(e._id),_ref:e._id}));
  const excerpt=clean(doc(post.excerpt.rendered.replace(/\[\/?vc_[^\]]*\]/g,'')).body.textContent).replace(/\s*(Läs mer|Read more).*$/i,'') || clean(doc(post.content.rendered).querySelector('p')?.textContent||'').slice(0,300);
  const id=`drafts.imported-wa-article-${post.id}`;
  const data={_id:id,_type:'article',title,slug:{_type:'slug',current:preview.slug},excerpt,body,...(writers.length?{writers}:{}),publishedAt:post.date_gmt?`${post.date_gmt}Z`:post.date};
  let imageSource;
  if(post.featured_media){const media=await json(`https://wa-advokat.se/wp-json/wp/v2/media/${post.featured_media}`);imageSource=media.source_url;
   if(write){const image=await fetch(imageSource);if(!image.ok)throw Error(`Image fetch failed: ${imageSource}`);
    const asset=await client.assets.upload('image',Buffer.from(await image.arrayBuffer()),{filename:new URL(imageSource).pathname.split('/').pop(),source:{id:String(media.id),name:'wa-advokat.se',url:imageSource}});
    data.image={_type:'image',asset:{_type:'reference',_ref:asset._id},alt:clean(media.alt_text||title)};
   }
  }
  if(write){const saved=await client.createIfNotExists(data);if(saved.title!==title || saved.body?.length!==body.length)throw Error(`Verification failed: ${title}`);}
  report.push({title,slug:preview.slug,id,status:write?'created draft':'ready',blocks:body.length,writers:writers.length,imageSource,publishedAt:data.publishedAt});
 }
 fs.writeFileSync('scripts/import-articles.report.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
 console.log(`${report.filter(r=>r.status==='created draft').length} drafts created; ${report.filter(r=>r.status==='already exists').length} existing articles skipped.`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
