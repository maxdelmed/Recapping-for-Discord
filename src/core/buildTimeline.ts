export function buildTimeline(messages: { time: number; author: string; text: string }[]) {
  const important = messages.filter(m =>
    /\b(merge|decided|we agreed|done|complete|published|update|fixed|fix|release|deploy)\b/i.test(m.text) ||
    /https?:\/\/\S+/.test(m.text)
  );

  return important.slice(0, 8).map(m => ({
    timeText: new Date(m.time).toLocaleString(),
    who: m.author,
    preview: m.text.slice(0, 120)
  }));
}