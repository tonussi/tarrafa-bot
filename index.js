require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

const hexutil = require('./ColorHexUtil');

const bch = require('./BotCommandsHelper');

client.on('ready', () => {
  client.user.setActivity(bch.config.ACTIVITY, { type: 'WATCHING' });
});

client.on('messageCreate', (msg) => {
  if (!msg.content.startsWith(bch.config.PREFIX)) return;

  const command = msg.content.split(' ')[0].slice(1); // remove prefix
  const extraArgs = msg.content.split(' ').slice(1);
  console.log(command, extraArgs);

  const lang = extraArgs[0] ? extraArgs[0] : 'pt';
  if (command === 'help') return msg.reply(bch.config.HELP[lang]);
  else if (command === 'info') return msg.reply(bch.config.INFO[lang]);
  else if (command === 'c') return msg.reply(bch.config.COMMANDS);
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
