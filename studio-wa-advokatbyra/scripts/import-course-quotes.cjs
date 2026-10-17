const {getCliClient} = require('sanity/cli');
const fs = require('node:fs');
const entries = [
 ['Sofia', 'Grundkurs i entreprenadjuridik', 'grund', 'Utmärkt utbildning med bra kursledare! Känner att jag efter kursen har fått en grundläggande förståelse för entreprenadjuridiken och framförallt mer kunskap om grundavtalen i branschen'],
 ['Filip', 'grundkurs och fortsättningskurs i entreprenadjuridik', null, 'Rekommenderar varmt både grund- och fördjupningsutbildningarna i entreprenadjuridik. Ett mycket bra upplägg med både praktik och teori.'],
 ['Emil', 'Entreprenadjuridik; Grundkurs 2018', 'grund', 'Jag är väldigt nöjd med utbildningen och den kompetente kursledaren! Kursen gav mig förståelse för många juridiska problem och framförallt mer kunskap om AB 04 och ABT 06.'],
 ['Johan', 'Entreprenadjuridik; Besiktning 2018', 'besikt', 'En gedigen utbildning som ger färdigheter både i teorin och i praktiken. Dessutom är kursens innehåll kopplat till verkligheten med lösningar som kommer till användning i det dagliga arbetet.'],
 ['Gabriel', 'Entreprenadjuridik; Avtalsskrivning och avtalsgranskning 2018', 'avtal', 'Utmärkt kurs för att utveckla sina kunskaper i entreprenadjuridik och avtalsskrivning! Kursen motsvarade mina förväntningar med råge!'],
 ['Lars-Erik', 'Entreprenadjuridik; Konsulträtt (ABK 09) 2018', 'konsult', 'Lärde mig mängder med nya saker under utbildningen! Kunniga och hjälpsamma lärare som dagligen arbetar med entreprenadjuridik och som därmed inger mycket gott förtroende.'],
];
async function main() {
 const client = getCliClient({apiVersion:'2024-01-01'}).withConfig({useCdn:false,perspective:'raw'});
 const docs = await client.fetch('*[_type == "courseCategory" && slug.current == "entreprenadjuridik"]');
 const published = docs.filter(d=>!d._id.startsWith('drafts.'));
 if(published.length!==1) throw Error('Expected one category');
 const draftId = `drafts.${published[0]._id}`;
 const draft = docs.find(d=>d._id===draftId);
 const original = draft || published[0];
 const courses = await client.fetch('*[_type == "course" && category._ref == $id && !(_id in path("drafts.**"))]{_id,courseName,"slug":slug.current}',{id:published[0]._id});
 const items = entries.map(([person,courseLabel,match,quote])=>{
  const matches = match ? courses.filter(c=>`${c.courseName} ${c.slug}`.toLowerCase().includes(match)) : [];
  return {_type:'quotes',_key:`quote-${person.toLowerCase()}`,person,courseLabel,quote,...(matches.length===1?{courseTaken:{_type:'reference',_ref:matches[0]._id}}:{})};
 });
 const existing = original.courseQuotesSection || [];
 const additions = items.filter(item=>!existing.some(q=>q.quote===item.quote));
 console.log(JSON.stringify({category:original.title,additions:additions.length,courses,items},null,2));
 if(!process.argv.includes('--write') || !additions.length) return;
 fs.writeFileSync(`/tmp/wa-quotes-backup-${Date.now()}.json`,JSON.stringify(original),{mode:0o600});
 if(draft) await client.patch(draftId).ifRevisionId(draft._rev).setIfMissing({courseQuotesSection:[]}).append('courseQuotesSection',additions).commit();
 else {const {_id,_rev,_createdAt,_updatedAt,...fields}=original; await client.create({...fields,_id:draftId,courseQuotesSection:[...existing,...additions]});}
 const saved = await client.getDocument(draftId);
 for(const item of items) if(!saved.courseQuotesSection.some(q=>q.quote===item.quote && q.person===item.person && q.courseLabel===item.courseLabel)) throw Error('Verification failed');
 console.log('Verified all six quotes in Sanity draft.');
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
