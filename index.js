const Discord = require('discord.js');
const winston = require("winston");
const hexutil = require('./ColorHexUtil');
const bch = require('./BotCommandsHelper');

require('dotenv').config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  client.user.setActivity(bch.config.ACTIVITY, { type: 'WATCHING' });
});

client.on('messageCreate', (msg) => {
  if (!msg.content.startsWith(bch.config.PREFIX)) return logger.error("Wrong prefix");;

  const command = msg.content.split(' ')[0].slice(1); // remove prefix
  const extraArgs = msg.content.split(' ').slice(1);
  console.log(command, extraArgs);

  const lang = extraArgs[0] ? extraArgs[0] : 'pt';
  if (command === 'help') return buildDiscordRichEmbed(bch.config.HELP[lang]);
  else if (command === 'info') return buildDiscordRichEmbed(bch.config.INFO[lang]);
  else if (command === 'c') return buildDiscordRichEmbed(bch.config.COMMANDS);
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
