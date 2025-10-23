const STOP_WORDS = new Set([
  "the","a","an","and","or","of","for","to","in","on","at","is","are","it","this","that","with","as","by","be","was","were","from","have","has","had","you","we","they","he","she","his","her","their","our"
]);

export function splitIntoTokens(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9@#\s]/g, " ")
    .split(/\s+/)
    .filter(word => word && !STOP_WORDS.has(word) && word.length > 2);
}

export function getTopKeywords(texts: string[], count = 10) {
  const map = new Map<string, number>();
  for (const text of texts) {
    for (const token of splitIntoTokens(text)) {
      map.set(token, 1 + (map.get(token) ?? 0));
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([term, times]) => ({ term, times }));
}