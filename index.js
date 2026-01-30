console.log("Bot starting...");

const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Events,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, async () => {
  console.log(`[SUCCESS] Logged in as ${client.user.tag} YEY`);

  // Register /ping command (global)
  const pingCommand = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with latency in ms");

  try {
    await client.application.commands.create(pingCommand);
    console.log("✅ /ping command registered");
  } catch (err) {
    console.error("❌ Failed to register /ping:", err);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    const sent = await interaction.reply({
      content: "🏓 Pinging...",
      withResponse: true,
    });

    const latency =
      sent.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply(
      `🏓 Pong! It took ${latency}ms for BBUtils to reply to this command.`
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
