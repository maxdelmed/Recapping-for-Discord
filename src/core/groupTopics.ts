import { splitIntoTokens } from "./preprocess";

export function groupTopics(messages: { text: string }[], groupCount = 3) {
  const tokenSets = messages.map(m => new Set(splitIntoTokens(m.text)));
  const global = new Map<string, number>();

  tokenSets.forEach(set => set.forEach(t => global.set(t, 1 + (global.get(t) ?? 0))));
  const topTokens = Array.from(global.entries()).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([t]) => t);

  const centers = topTokens.slice(0, groupCount);
  const groups: { center: string; indexes: number[] }[] = centers.map(c => ({ center: c, indexes: [] }));

  tokenSets.forEach((set, i) => {
    let bestIndex = 0;
    for (let j = 0; j < centers.length; j++) {
      if (set.has(centers[j])) { bestIndex = j; break; }
    }
    groups[bestIndex].indexes.push(i);
  });

  return groups.map(g => ({
    keyword: g.center,
    samples: g.indexes.map(i => messages[i].text).slice(0, 3)
  }));
}