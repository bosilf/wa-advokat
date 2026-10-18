const fs=require('node:fs');
const {createHash}=require('node:crypto');
const {JSDOM}=require('jsdom');
const {getCliClient}=require('sanity/cli');
const key=s=>createHash('sha256').update(s).digest('hex').slice(0,20);
const clean=s=>s.replace(/\s+/g,' ').trim();
const normalize=s=>clean(s).toLowerCase().replace(/\bi\b/g,'').replace(/\s+/g,' ').trim();
async function main(){
 const path=process.argv.find(a=>a.endsWith('.txt'));
 const doc=new JSDOM(fs.readFileSync(path,'utf8')).window.document;
 const items=[...doc.querySelectorAll('h4 a')].map(a=>{
  const img=a.closest('.wpb_column')?.querySelector('img');
  const images=(img?.getAttribute('srcset')||'').split(',').map(s=>s.trim().split(/\s+/)).filter(p=>p.length===2).sort((a,b)=>parseInt(b[1])-parseInt(a[1]));
  return {title:clean(a.textContent),slug:new URL(a.href).pathname.split('/').filter(Boolean).pop(),paragraphs:[...a.closest('.wpb_wrapper').querySelectorAll('p')].map(p=>clean(p.textContent)).filter(Boolean),image:images[0]?.[0]||img?.src,alt:clean(img?.alt||'')};
 });
 if(items.length!==12||items.some(i=>!i.paragraphs.length))throw Error('Expected 12 courses with descriptions');
 const client=getCliClient({apiVersion:'2024-01-01'}).withConfig({useCdn:false,perspective:'raw'});
 const [categories,courses]=await Promise.all([client.fetch('*[_type=="courseCategory" && slug.current=="entreprenadjuridik" && !(_id in path("drafts.**"))]{_id,title}'),client.fetch('*[_type=="course"]{_id,courseName,"slug":slug.current,category}')]);
 if(categories.length!==1)throw Error('Expected one category');
 const category=categories[0],report=[],images=new Map();
 for(const item of items){
  const match=courses.find(c=>c.category?._ref===category._id&&(c.slug===item.slug||normalize(c.courseName||'')===normalize(item.title)));
  if(match){report.push({title:item.title,status:'already exists',id:match._id});continue;}
  const id=`drafts.imported-wa-course-${key(item.slug)}`;
  const data={_id:id,_type:'course',courseName:item.title,slug:{_type:'slug',current:item.slug},category:{_type:'reference',_ref:category._id},intro:item.paragraphs.map((text,i)=>({_type:'block',_key:key(`${item.slug}-${i}`),style:'normal',markDefs:[],children:[{_type:'span',_key:key(`span-${i}`),text,marks:[]}]})),hero:{_type:'heroRegular',title:item.title,eyebrow:category.title}};
  if(process.argv.includes('--write')){
   if(item.image){
    if(!images.has(item.image)){const res=await fetch(item.image);if(!res.ok)throw Error(`Image failed: ${item.image}`);const asset=await client.assets.upload('image',Buffer.from(await res.arrayBuffer()),{filename:new URL(item.image).pathname.split('/').pop()});images.set(item.image,asset._id);}
    data.hero.image={_type:'image',asset:{_type:'reference',_ref:images.get(item.image)},alt:item.alt||item.title};
   }
   await client.createIfNotExists(data);
   const saved=await client.getDocument(id);
   if(saved.courseName!==item.title||saved.category._ref!==category._id||saved.intro.map(b=>b.children.map(s=>s.text).join('')).join('\n')!==item.paragraphs.join('\n'))throw Error('Verification failed: '+item.title);
   console.log('Verified draft: '+item.title);
  }
  report.push({title:item.title,status:process.argv.includes('--write')?'created draft':'ready',id,slug:item.slug,paragraphs:item.paragraphs.length});
 }
 fs.writeFileSync('scripts/import-courses.report.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
 console.log(`${report.filter(i=>i.status==='created draft').length} drafts created; ${report.filter(i=>i.status==='already exists').length} existing courses skipped.`);
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
