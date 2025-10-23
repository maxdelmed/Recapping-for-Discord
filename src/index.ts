import "dotenv/config";
import { Client, GatewayIntentBits, Interaction } from "discord.js";
import * as recap from "./commands/recap";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ]
});

client.once("ready", () => {
  console.log(`RecapBot is online as ${client.user?.tag}`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "recap") {
    await recap.execute(interaction);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);