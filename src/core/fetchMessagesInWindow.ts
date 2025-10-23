import {
  Client,
  TextChannel,
  ChannelType,
  Collection,
  Message,
  MessageReaction,
  Attachment
} from "discord.js";

/**
 * Fetch messages from a channel, moving backward, until we reach the window.
 * Returns messages in chronological order (oldest first).
 */
export async function fetchMessagesInWindow(
  channelId: string,
  client: Client,
  sinceMilliseconds: number,
  messageLimit = 800
) {
  const channel = await client.channels.fetch(channelId);

  // Must be a guild text channel
  if (!channel || channel.isDMBased() || channel.type !== ChannelType.GuildText) return [];

  const textChannel = channel as TextChannel;

  const result: {
    time: number;
    author: string;
    text: string;
    links: string[];
    attachments: string[];
    reactions: string[];
  }[] = [];

  let lastMessageId: string | undefined = undefined;

  while (result.length < messageLimit) {
    const batch: Collection<string, Message> = await textChannel.messages.fetch({
      limit: 100,
      before: lastMessageId
    });

    if (batch.size === 0) break;

    for (const [, message] of batch) {
      const time = message.createdTimestamp;
      if (time < sinceMilliseconds) return sortByTime(result);

      const linkMatches = Array.from(
        message.content?.matchAll(/https?:\/\/\S+/g) ?? []
      ) as RegExpMatchArray[];

      const links = linkMatches.map((m) => m[0]);

      const attachments = Array.from(message.attachments.values()).map(
        (a: Attachment) => a.url
      );

      const reactions = Array.from(message.reactions.cache.values())
        .map((r: MessageReaction) => r.emoji.name ?? "")
        .filter(Boolean) as string[];

      result.push({
        time,
        author: message.author?.username ?? "unknown",
        text: message.content ?? "",
        links,
        attachments,
        reactions
      });
    }

    lastMessageId = batch.last()?.id;
    if (!lastMessageId) break;
  }

  return sortByTime(result);
}

function sortByTime<T extends { time: number }>(items: T[]) {
  return items.sort((a, b) => a.time - b.time);
}