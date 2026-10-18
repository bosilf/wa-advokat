type TextBlock = {
  _key: string;
  style?: string;
  children?: {text?: string}[];
};

export function splitCourseMoments<T extends TextBlock>(blocks: readonly T[]) {
  const intro: T[] = [];
  const moments: {id: string; title: string; blocks: T[]}[] = [];

  for (const block of blocks) {
    const title = block.children?.map(child => child.text ?? "").join("").trim() ?? "";
    if (/^h[1-6]$/.test(block.style ?? "") && /^Block\s+\d+\b/i.test(title)) {
      moments.push({id: block._key, title, blocks: []});
    } else {
      (moments.at(-1)?.blocks ?? intro).push(block);
    }
  }

  return {intro, moments};
}
