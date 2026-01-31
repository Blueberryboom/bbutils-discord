const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const pkg = require("../../package.json");

const startTime = Date.now();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Shows BBUtils service status"),

  async execute(interaction, client) {
    const latency = client.ws.ping;

    const uptimeMs = Date.now() - startTime;
    const seconds = Math.floor(uptimeMs / 1000) % 60;
    const minutes = Math.floor(uptimeMs / (1000 * 60)) % 60;
    const hours = Math.floor(uptimeMs / (1000 * 60 * 60));

    const embed = new EmbedBuilder()
      .setTitle("🟢 BBUtils Service Status")
      .setColor(0x57f287)
      .addFields(
        { name: "🏓 Latency", value: `${latency}ms`, inline: true },
        { name: "⏱️ Uptime", value: `${hours}h ${minutes}m ${seconds}s`, inline: true },
      )
      .setFooter({
        text: `BBUtils v${pkg.version} • Powered by blueberrynet.uk`,
      });
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  
  },
};
