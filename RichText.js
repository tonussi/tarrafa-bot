const Discord = require('discord.js');
const hexutil = require('./ColorHexUtil');

function buildDiscordRichEmbed(text) {
  let embed = new Discord.EmbedBuilder();
  embed.setColor(hexutil.generateHexColor());
  if (text.length < 2048) {
    embed.setDescription(text);
  } else {
    embed.setDescription(
      'Try reducing the request, because you exceed the length limit.'
    );
  }
  return embed;
}

module.exports.buildDiscordRichEmbed = buildDiscordRichEmbed;
