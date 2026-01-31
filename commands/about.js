const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const pkg = require("../package.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Information about BBUtils"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("♥️ BBUtils")
      .setDescription("A cool utility bot powered by the Blueberry Network!")
      .setColor(0x5865F2) // Discord blurple
      .addFields(
        { name: "Version", value: pkg.version, inline: true },
        { name: "Node.js", value: process.version, inline: true },
        {
          name: "Uptime",
          value: formatUptime(process.uptime()),
          inline: true,
        }
      )
      .setFooter({
        text: "BBUtils • Built by Blueberryboom!",
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}
