const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { version } = require("../../package.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Shows BBUtils service status"),

  async execute(interaction, client) {

    // --- Latency ---
    const latency = client.ws.ping;

    // --- Container / Process uptime ---
    const totalSeconds = Math.floor(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // --- Shard info ---
    const shardId = client.shard?.ids?.[0] ?? 0;
    const shardCount = client.shard?.count ?? 1;

    // --- Memory usage ---
    const memoryMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    const embed = new EmbedBuilder()
      .setTitle("🟢 BBUtils Service Status")
      .setColor(0x57f287)

      .addFields(
        { name: "🏓 Latency", value: `${latency}ms`, inline: true },

        {
          name: "⏱️ Container Uptime",
          value: `${hours}h ${minutes}m ${seconds}s`,
          inline: true,
        },

        {
          name: "🧩 Shard",
          value: `Shard **${shardId + 1}** of **${shardCount}**`,
          inline: true,
        },

        {
          name: "🧠 Memory Usage",
          value: `${memoryMB} MB`,
          inline: true,
        },

        {
          name: "📦 Environment",
          value: `Node ${process.version}\ndiscord.js ${require("discord.js").version}`,
          inline: true,
        }
      )

      .setFooter({
        text: `BBUtils v${version} • Powered by blueberrynet.uk`,
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed
                                      ] });
  },
};
