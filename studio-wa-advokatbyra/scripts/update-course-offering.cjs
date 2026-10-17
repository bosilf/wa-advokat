const fs=require('node:fs');
const {getCliClient}=require('sanity/cli');
const paragraphs=[
'Vi erbjuder företagsinterna kurser inom entreprenadjuridik och närliggande områden. Ni samlar ihop några kollegor och vi tar fram en utbildning som är anpassad efter just de juridiska frågeställningar som er organisation vill fördjupa sig i.',
'Våra kurser/utbildningar vänder sig till dig som vill kompetensutvecklas inom ditt yrke och regelbundet kommer i kontakt med entreprenadjuridik samt standardavtalen AB 04, ABT 06 och ABK 09. Kanske arbetar du som konsult eller företräder en beställarorganisation inom bygg- och anläggningsbranschen? Du kan till exempel ha en chefsbefattning, vara arbetsledare, upphandlare, byggarbetsmiljösamordnare, projektledare, besiktningsman eller på annat sätt företräda en entreprenör, konsult eller beställarorganisation.',
'Genom utbildning av personalen minskas riskerna i projekten och slutresultatet blir ofta betydligt bättre. Det är också ett bra sätt att hålla sig uppdaterad på rättsutvecklingen. Våra utbildningar innehåller därför alltid exempel från verkliga fall samt en genomgång av relevant rättspraxis. För en lyckad utbildning är det också viktigt att deltagarna får med sig konkreta redskap att använda i sitt vardagliga arbete. I utbildningarna varvar vi alltid teori med praktik under handledning av våra erfarna kursledare.',
'Vi har ett brett grundutbud av kurser/utbildningar såsom till exempel grundkurs och fortsättningskurs i entreprenadjuridik, kurs i konsulträtt och en kurs i avtalsjuridik specifikt framtagen för entreprenadbranschen. Ni är alltid garanterade en erfaren kursledare och en utbildning med ett praktiskt perspektiv!',
'Kontakta oss via telefon 08-410 606 01 eller utbildning@wa-advokat.se för offert, om ni har frågor, eller önskemål om skräddarsydda utbildningar som passar just för er organisation!',
'Ovan ser ni grundutbudet av våra kurser/utbildningar.'
];
const text={_type:'blockObject',block:paragraphs.map((text,i)=>({_type:'block',_key:`offering-${i}`,style:'normal',markDefs:[],children:i===1?text.split(/(entreprenadjuridik)/).map((part,j)=>({_type:'span',_key:`text-${i}-${j}`,text:part,marks:part==='entreprenadjuridik'?['strong']:[]})):[{_type:'span',_key:`text-${i}`,text,marks:[]}]}))};
async function main(){
 const client=getCliClient({apiVersion:'2024-01-01'}).withConfig({useCdn:false,perspective:'raw'});
 const docs=await client.fetch('*[_type=="courseCategory" && slug.current=="entreprenadjuridik"]');
 const published=docs.filter(d=>!d._id.startsWith('drafts.'));
 if(published.length!==1)throw Error('Expected one category');
 const id=`drafts.${published[0]._id}`;
 const draft=docs.find(d=>d._id===id),original=draft||published[0];
 fs.writeFileSync(`/tmp/wa-offering-backup-${Date.now()}.json`,JSON.stringify(original),{mode:0o600});
 if(draft)await client.patch(id).ifRevisionId(draft._rev).set({courseOfferingText:text}).commit();
 else {const {_id,_rev,_createdAt,_updatedAt,...fields}=original;await client.create({...fields,_id:id,courseOfferingText:text});}
 const saved=await client.getDocument(id);
 if(saved.courseOfferingText.block.map(b=>b.children.map(s=>s.text).join('')).join('\n')!==paragraphs.join('\n'))throw Error('Text verification failed');
 if(JSON.stringify(saved.courseInfoLongSection)!==JSON.stringify(original.courseInfoLongSection))throw Error('CourseBlock description changed unexpectedly');
 if(!saved.courseOfferingText.block[1].children.some(s=>s.text==='entreprenadjuridik'&&s.marks.includes('strong')))throw Error('Bold formatting verification failed');
 console.log('Verified six paragraphs and bold formatting in courseOfferingText. CourseBlocksSection description preserved. Saved to draft '+id);
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
