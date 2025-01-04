// Discord.js bot
require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
  ],
});

const hexutil = require('./ColorHexUtil');

const bch = require('./BotCommandsHelper');

client.on('ready', () => {
  client.user.setActivity(bch.config.ACTIVITY, { type: 'WATCHING' });
});

client.on('message', (msg) => {
  if (!msg.content.startsWith(bch.config.PREFIX) || !msg.guild) return;
  const command = msg.content.split(' ')[0].substr(bch.config.PREFIX.length);
  const args = msg.content.split(' ').slice(1).join(' ');

  if (command === 'help') return msg.reply(bch.config.HELP[args[0]]);
  else if (command === 'info') return msg.reply(bch.config.INFO[args[0]]);
  else if (command === 'c') return msg.reply(bch.config.COMMANDS);
  else if (command === 'a') return msg.reply(getAllVersionsAndCmt());
  else if (command === 'refs') return msg.reply(getAllRefPtBrFormat());
  else return;
});

function buildDiscordRichEmbed(text) {
  let embed = new Discord.MessageEmbed();
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

client.login(process.env.TOKEN);
