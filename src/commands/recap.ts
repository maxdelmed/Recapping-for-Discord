import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ChannelType
} from "discord.js";
import { fetchMessagesInWindow } from "../core/fetchMessagesInWindow";
import { buildEmbedFromAnalysis } from "../core/buildEmbed";

export const data = new SlashCommandBuilder()
  .setName("recap")
  .setDescription("Create a clear summary of recent messages")
  .addIntegerOption(o =>
    o.setName("hours").setDescription("How many hours to summarize (for example, 24)").setRequired(true)
  )
  .addChannelOption(o =>
    o.setName("channel")
      .setDescription("Choose a text channel (optional)")
      .addChannelTypes(ChannelType.GuildText)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const hours = interaction.options.getInteger("hours", true);
  const chosenChannel = interaction.options.getChannel("channel") ?? interaction.channel;

  if (!chosenChannel || chosenChannel.type !== ChannelType.GuildText) {
    return interaction.reply({ content: "Please pick a valid text channel.", ephemeral: true });
  }

  await interaction.deferReply();

  const since = Date.now() - hours * 3600_000;
  const messages = await fetchMessagesInWindow(chosenChannel.id, interaction.client, since, 800);

  const embed = buildEmbedFromAnalysis(messages, {
    channelName: chosenChannel.name ?? "unknown-channel",
    hours
  });

  await interaction.editReply({ embeds: [embed] });
}