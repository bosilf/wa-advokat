const fs = require('node:fs');
const {getCliClient} = require('sanity/cli');
async function main() {
 const client=getCliClient({apiVersion:'2024-01-01'}).withConfig({useCdn:false,perspective:'raw'});
 const docs=await client.fetch('*[_type=="courseCategory" && slug.current=="entreprenadjuridik"]');
 const published=docs.filter(d=>!d._id.startsWith('drafts.'));
 if(published.length!==1)throw Error('Expected one Entreprenadjuridik category');
 const id=`drafts.${published[0]._id}`;
 const draft=docs.find(d=>d._id===id);
 const original=draft||published[0];
 const heading='Detta lär du på en grundkurs';
 const description='Du blir medveten om risker och fallgropar vid kontraktsskrivning och under pågående entreprenad, samt lära sig att förebygga dessa risker.';
 const section={...original.courseInfoLongSection,_type:'object',title:{...original.courseInfoLongSection?.title,_type:'titleObject',title:heading},text:{_type:'blockObject',block:[{_type:'block',_key:'course-intro-description',style:'normal',markDefs:[],children:[{_type:'span',_key:'course-intro-text',text:description,marks:[]}]}]}};
 fs.writeFileSync(`/tmp/wa-course-intro-backup-${Date.now()}.json`,JSON.stringify(original),{mode:0o600});
 if(draft)await client.patch(id).ifRevisionId(draft._rev).set({courseInfoLongSection:section}).commit();
 else {const {_id,_rev,_createdAt,_updatedAt,...fields}=original;await client.create({...fields,_id:id,courseInfoLongSection:section});}
 const saved=await client.getDocument(id);
 if(saved.courseInfoLongSection.title.title!==heading || saved.courseInfoLongSection.text.block[0].children[0].text!==description)throw Error('Verification failed');
 console.log(JSON.stringify({id,heading,description,verified:true}));
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
