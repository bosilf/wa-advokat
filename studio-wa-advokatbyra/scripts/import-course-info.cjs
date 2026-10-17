const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const {JSDOM} = require('jsdom');
const {getCliClient} = require('sanity/cli');

const sourcePath = process.argv.find((arg) => arg.endsWith('.txt'));
const write = process.argv.includes('--write');
if (!sourcePath) throw new Error('Pass the HTML .txt attachment path. Add --write to update the Sanity draft.');

const key = (text) => createHash('sha256').update(text).digest('hex').slice(0, 20);
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
const document = new JSDOM(fs.readFileSync(sourcePath, 'utf8')).window.document;
const items = [...document.querySelectorAll('.vc_tta-panel')].flatMap((panel) => {
  const title = normalize(panel.querySelector('.vc_tta-title-text')?.textContent || '');
  const body = panel.querySelector('.vc_tta-panel-body');
  const paragraphs = [...(body?.querySelectorAll('p') || [])];
  if (!title || !paragraphs.some((paragraph) => normalize(paragraph.textContent))) return [];

  const blocks = paragraphs.flatMap((paragraph, paragraphIndex) => {
    const spans = [];
    function walk(node, marks = []) {
      if (node.nodeType === 3) {
        const text = node.textContent.replace(/\s+/g, ' ');
        if (text) spans.push({_type: 'span', _key: key(`${title}-${paragraphIndex}-${spans.length}`), text, marks});
        return;
      }
      const tag = node.nodeName.toLowerCase();
      const mark = {em: 'em', i: 'em', strong: 'strong', b: 'strong'}[tag];
      for (const child of node.childNodes) walk(child, mark ? [...new Set([...marks, mark])] : marks);
    }
    walk(paragraph);
    if (!normalize(spans.map((span) => span.text).join(''))) return [];
    spans[0].text = spans[0].text.trimStart();
    spans[spans.length - 1].text = spans[spans.length - 1].text.trimEnd();
    return [{_type: 'block', _key: key(`${title}-${paragraphIndex}`), style: 'normal', markDefs: [], children: spans}];
  });
  return [{_type: 'object', _key: key(title), title, text: {_type: 'blockObject', block: blocks}}];
});

async function main() {
  if (items.length !== 15 || new Set(items.map((item) => item._key)).size !== items.length) {
    throw new Error('Expected 15 unique course moments; review the source before importing.');
  }
  const client = getCliClient({apiVersion: '2024-01-01'}).withConfig({useCdn: false, perspective: 'raw'});
  const candidates = await client.fetch('*[_type == "courseCategory" && slug.current == $slug]', {slug: 'entreprenadjuridik'});
  const published = candidates.find((item) => !item._id.startsWith('drafts.'));
  const draft = candidates.find((item) => item._id === `drafts.${published?._id}`);
  const original = draft || published;
  if (!published || !original) throw new Error('Could not uniquely identify the Entreprenadjuridik category.');
  if (candidates.filter((item) => !item._id.startsWith('drafts.')).length !== 1) throw new Error('Multiple categories match; no changes made.');
  if (original.courseInfoSection && !Array.isArray(original.courseInfoSection)) throw new Error('Existing courseInfoSection is not an array; no changes made.');

  const existing = original.courseInfoSection || [];
  const titles = new Set(existing.map((item) => normalize(item.title || '').toLocaleLowerCase('sv')));
  const additions = items.filter((item) => !titles.has(normalize(item.title).toLocaleLowerCase('sv')));
  const summary = {category: original.title, publishedId: published._id, draftId: `drafts.${published._id}`, existing: existing.length, additions: additions.map((item) => item.title), skipped: items.length - additions.length};
  const previewPath = path.resolve('scripts/entreprenadjuridik-course-info.preview.json');
  fs.writeFileSync(previewPath, JSON.stringify({summary, items}, null, 2) + '\n');
  console.log(JSON.stringify(summary, null, 2));
  if (!write || additions.length === 0) return;
  if (!client.config().token) throw new Error('Sanity CLI authentication is required. Run sanity login and retry with --with-user-token.');

  const backupPath = `/tmp/wa-entreprenadjuridik-before-import-${Date.now()}.json`;
  fs.writeFileSync(backupPath, JSON.stringify(original, null, 2) + '\n', {mode: 0o600});
  const draftId = `drafts.${published._id}`;
  if (draft) {
    await client.patch(draftId).ifRevisionId(draft._rev).setIfMissing({courseInfoSection: []}).append('courseInfoSection', additions).commit();
  } else {
    const {_id, _rev, _createdAt, _updatedAt, ...fields} = published;
    await client.create({...fields, _id: draftId, courseInfoSection: [...existing, ...additions]});
  }
  const saved = await client.fetch('*[_id == $id][0]{_id, courseInfoSection}', {id: draftId});
  for (const item of additions) {
    const actual = saved.courseInfoSection.find((candidate) => candidate._key === item._key);
    if (JSON.stringify(actual) !== JSON.stringify(item)) {
      // Object key order may differ after storage; compare the content explicitly.
      if (!actual || actual.title !== item.title || JSON.stringify(actual.text.block.map((b) => b.children.map((s) => [s.text, s.marks]))) !== JSON.stringify(item.text.block.map((b) => b.children.map((s) => [s.text, s.marks])))) {
        throw new Error(`Post-import verification failed for ${item.title}`);
      }
    }
  }
  console.log(`Verified ${additions.length} imported moments in the draft (${saved.courseInfoSection.length} total). Published document unchanged. Backup: ${backupPath}`);
}
main().catch((error) => {console.error(error.message); process.exitCode = 1;});
