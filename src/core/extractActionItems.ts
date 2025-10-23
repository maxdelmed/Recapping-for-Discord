export function extractActionItems(messages: { author: string; text: string }[]) {
  const items: { who: string; text: string }[] = [];
  const pattern = /\b(todo|pending|do|fix|repair|review|follow up)\b/i;

  for (const m of messages) {
    if (pattern.test(m.text)) {
      items.push({ who: m.author, text: m.text.slice(0, 120) });
    }
  }
  return items.slice(0, 8);
}