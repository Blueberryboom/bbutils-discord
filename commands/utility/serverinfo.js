const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const pkg = require("../../package.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Shows information about this server"),

  async execute(interaction) {
    const { guild } = interaction;

    await guild.fetch(); // ensure full data

    const owner = await guild.fetchOwner();

    const textChannels = guild.channels.cache.filter(
      c => c.type === 0
    ).size;

    const voiceChannels = guild.channels.cache.filter(
      c => c.type === 2
    ).size;

    const embed = new EmbedBuilder()
      .setTitle(`📊 ${guild.name}`)
      .setThumbnail(guild.iconURL({ size: 256 }))
      .setColor(0x5865f2)
      .addFields(
        {
          name: "🆔 Server ID",
          value: guild.id,
          inline: true,
        },
        {
          name: "👑 Owner",
          value: `<@${owner.id}>`,
          inline: true,
        },
        {
          name: "👥 Members",
          value: `${guild.memberCount}`,
          inline: true,
        },
        {
          name: "💬 Text Channels",
          value: `${textChannels}`,
          inline: true,
        },
        {
          name: "🔊 Voice Channels",
          value: `${voiceChannels}`,
          inline: true,
        },
        {
          name: "🚀 Boosts",
          value: `Level ${guild.premiumTier} (${guild.premiumSubscriptionCount || 0} boosts)`,
          inline: true,
        },
        {
          name: "🔐 Verification Level",
          value: `${guild.verificationLevel}`,
          inline: true,
        },
        {
          name: "📅 Created",
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
          inline: false,
        }
      )
      .setFooter({
        text: `BBUtils v${pkg.version} • Powered by blueberrynet.uk`,
      });

    await interaction.reply({ embeds: [embed] });
  },
};

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor(seconds / 3600) % 24;
  const m = Math.floor(seconds / 60) % 60;
  return `${d}d ${h}h $
    {m}m`;
}
