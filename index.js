console.log("Bot starting...");

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", () => {
  console.log(`[SUCCESS] Logged in as ${client.user.tag} YEY`);
});

client.login(process.env.DISCORD_TOKEN);
