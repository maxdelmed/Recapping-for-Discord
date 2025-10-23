import "dotenv/config";
import { REST, Routes } from "discord.js";
import * as recap from "./commands/recap";

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.APPLICATION_IDENTIFIER!,
        process.env.SERVER_IDENTIFIER!
      ),
      { body: [recap.data.toJSON()] }
    );
    console.log("Slash command /recap was registered.");
  } catch (error) {
    console.error("Could not register commands:", error);
  }
})();