console.log("Bot starting...");

const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Command collection
client.commands = new Collection();

/**
 * Recursively load command files
 */
function loadCommands(dirPath) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      loadCommands(fullPath);
    } else if (file.name.endsWith(".js")) {
      const command = require(fullPath);

      if (!command.data || !command.execute) {
        console.warn(`⚠️ Skipping invalid command file: ${fullPath}`);
        continue;
      }

      client.commands.set(command.data.name, command);
      console.log(`📦 Loaded command: /${command.data.name}`);
    }
  }
}

// Load all commands
const commandsPath = path.join(__dirname, "commands");
loadCommands(commandsPath);

client.once(Events.ClientReady, async () => {
  console.log(`[SUCCESS] Logged in as ${client.user.tag}`);
  console.log(`📊 Total commands loaded: ${client.commands.size}`);

  try {
    await client.application.commands.set(
      client.commands.map(cmd => cmd.data)
    );
    console.log("✅ Slash commands registered globally");
  } catch (err) {
    console.error("❌ Failed to register commands:", err);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (err) {
    console.error(`❌ Error executing /${interaction.commandName}:`, err);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "❌ Something went wrong while running this command.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "❌ Something went wrong while running this command.",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
