export function getTopLinks(messages: { links: string[]; attachments: string[] }[]) {
  const links = messages.flatMap(m => m.links).slice(0, 5);
  const files = messages.flatMap(m => m.attachments).slice(0, 5);
  return { links, files };
}