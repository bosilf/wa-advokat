const fs=require('node:fs');
const {createHash}=require('node:crypto');
const {JSDOM}=require('jsdom');
const {getCliClient}=require('sanity/cli');
const key=s=>createHash('sha256').update(s).digest('hex').slice(0,20);
const clean=s=>s.replace(/\s+/g,' ').trim();
function convert(el,index){
 const children=[],markDefs=[];
 function walk(n,marks=[]){
  if(n.nodeType===3){if(n.textContent)children.push({_type:'span',_key:key(`${index}-${children.length}`),text:n.textContent,marks});return;}
  if(n.nodeName==='BR'){children.push({_type:'span',_key:key(`${index}-${children.length}`),text:'\n',marks});return;}
  let next=marks;const m={STRONG:'strong',B:'strong',EM:'em',I:'em'}[n.nodeName];if(m)next=[...marks,m];
  if(n.nodeName==='A'&&/^(https?:|mailto:|tel:)/.test(n.getAttribute('href')||'')){const id=key(`${index}-link-${markDefs.length}`);markDefs.push({_type:'link',_key:id,href:n.getAttribute('href')});next=[...marks,id];}
  for(const c of n.childNodes)walk(c,next);
 }
 for(const n of el.childNodes)walk(n);
 return {_type:'block',_key:key(`${index}-${el.textContent}`),style:/^H[1-6]$/.test(el.nodeName)?'h3':'normal',markDefs,children,...(el.nodeName==='LI'?{listItem:el.parentElement.nodeName==='OL'?'number':'bullet',level:1}:{})};
}
async function main(){
 const report=JSON.parse(fs.readFileSync('scripts/import-courses.report.json','utf8'));
 const preview=[];
 for(const item of report){
  const slug=({ 'cd3bebfa-df66-48c4-a249-4f912adf925f':'grundkurs','680973ed-6e46-4e55-9f56-10d0a4e671a8':'fortsattningskurs','a67121ef-6a60-429b-a6d9-03ed3d873fa1':'avtalsjuridik','b7ecdbf6-9e6b-4d17-a24d-1300dff4b0a4':'konsultratt-abk-09','53f1d413-f72c-42aa-8bb1-326d7d490ba4':'kurs-om-skillnaderna-mellan-de-nya-och-gamla-ab-avtalen'})[item.id]||item.slug;
  const cache=`/tmp/wa-course-source-${slug}.json`;
  let page;
  if(fs.existsSync(cache))page=JSON.parse(fs.readFileSync(cache));
  else{const res=await fetch(`https://wa-advokat.se/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);if(!res.ok)throw Error('Source fetch failed '+slug);const pages=await res.json();if(pages.length!==1)throw Error('Expected one source page '+slug);page=pages[0];fs.writeFileSync(cache,JSON.stringify(page));}
  const textarea=new JSDOM('<textarea></textarea>').window.document.querySelector('textarea');textarea.innerHTML=page.content.rendered;
  const raw=textarea.value;
  const cols=[...raw.matchAll(/\[vc_column\b[^\]]*width=[^\]]*1\/2[^\]]*\]([\s\S]*?)\[\/vc_column\]/g)];
  if(!cols.length)throw Error('No main course column '+slug);
  const html=cols[0][1].replace(/\[vc_raw_js\][\s\S]*?\[\/vc_raw_js\]/g,'').replace(/\[\/?(?:vc_|gt3_)[^\]]*\]/g,'');
  const doc=new JSDOM(html).window.document;
  const elements=[...doc.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li')].filter(e=>!e.parentElement.closest('p,li')&&clean(e.textContent));
  const about=[],aim=[],sections=[];let target=about;let start=true;
  for(let index=0;index<elements.length;index++){
   const el=elements[index],text=clean(el.textContent);
   if(/^(Boka kurs|Kurstillfällen|Företagsanpassad kurs|Kontakta oss)$/i.test(text))break;
   if(/^H[1-6]$/.test(el.nodeName)){
    if(start && (el.nodeName==='H1'||normalize(text)===normalize(item.title))){start=false;continue;}
    if(/^(Vem riktar|Förkunskaper|Förutsättningar|Målgrupp)/i.test(text)){target=aim;continue;}
    const section={_type:'courseTextSection',_key:key(`${slug}-${sections.length}-${text}`),sectionTitle:text,sectionContent:[]};sections.push(section);target=section.sectionContent;continue;
   }
   start=false;target.push(convert(el,index));
  }
  if(!about.length && sections.length){
   const first=sections.shift();
   about.push({_type:'block',_key:key(slug+'-intro-heading'),style:'h3',markDefs:[],children:[{_type:'span',_key:'heading',text:first.sectionTitle,marks:[]}]},...first.sectionContent);
  }
  const courseSections=sections;
  if(!about.length||!courseSections.length)throw Error('Incomplete extraction '+slug);
  const lecturerText=clean(new JSDOM(raw.replace(/\[\/?(?:vc_|gt3_)[^\]]*\]/g,'')).window.document.body.textContent).slice(0,700);
  preview.push({...item,sourceSlug:slug,fields:{aboutCourse:about,...(aim.length?{aimCourse:aim}:{}),courseSections},lecturerText});
  console.log(JSON.stringify({title:item.title,introBlocks:about.length,prerequisiteBlocks:aim.length,sections:courseSections.map(s=>[s.sectionTitle,s.sectionContent.length])}));
 }
 fs.writeFileSync('scripts/import-course-pages.preview.json',JSON.stringify(preview,null,2)+'\n');
 if(!process.argv.includes('--write'))return;
 const client=getCliClient({apiVersion:'2024-01-01'}).withConfig({useCdn:false,perspective:'raw'});
 const employees=await client.fetch('*[_type=="employee" && !(_id in path("drafts.**"))]{_id,firstName,lastName}');
 for(const item of preview){
  const baseId=item.id.replace(/^drafts\./,'');const draftId=`drafts.${baseId}`;
  const [draft,published]=await Promise.all([client.getDocument(draftId),client.getDocument(baseId)]);
  const original=draft||published;if(!original)throw Error('Missing course '+item.title);
  const fields={};for(const [name,value]of Object.entries(item.fields))if(!original[name]?.length)fields[name]=value;
  const lengthSection=item.fields.courseSections.find(s=>/^(Utbildningens längd|Kurslängd)$/i.test(s.sectionTitle));
  if(!original.length && lengthSection)fields.length=lengthSection.sectionContent.map(b=>b.children.map(s=>s.text).join('')).join(' ');
  if(!original.lecturer){const found=employees.filter(e=>item.lecturerText.includes(`${e.firstName} ${e.lastName}`));if(found.length===1)fields.lecturer={_type:'reference',_ref:found[0]._id};}
  if(!Object.keys(fields).length){console.log('Preserved existing content: '+item.title);continue;}
  fs.writeFileSync(`/tmp/wa-course-before-full-import-${baseId}.json`,JSON.stringify(original),{mode:0o600});
  if(draft)await client.patch(draftId).ifRevisionId(draft._rev).set(fields).commit();
  else{const {_id,_rev,_createdAt,_updatedAt,...rest}=original;await client.create({...rest,...fields,_id:draftId});}
  const saved=await client.getDocument(draftId);
  for(const name of Object.keys(fields))if(JSON.stringify(saved[name])!==JSON.stringify(fields[name])){
   const canonical=o=>Array.isArray(o)?o.map(canonical):o&&typeof o==='object'?Object.fromEntries(Object.keys(o).sort().map(k=>[k,canonical(o[k])])):o;
   if(JSON.stringify(canonical(saved[name]))!==JSON.stringify(canonical(fields[name])))throw Error('Verification failed '+item.title+' '+name);
  }
  console.log('Verified '+item.title+': '+Object.keys(fields).join(', '));
 }
}
function normalize(s){return clean(s).toLowerCase();}
main().catch(e=>{console.error(e.message);process.exitCode=1});
