const Discord = require('discord.js');
const winston = require('winston');
const bch = require('./BotCommandsHelper');
const commandsManager = require('./CommandsManager');

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
  if (!msg.content.startsWith(bch.config.PREFIX))
    return logger.error('Wrong prefix');

  const command = msg.content.split(' ')[0].slice(1); // remove prefix
  const extraArgs = msg.content.split(' ').slice(1);
  logger.info({ command, extraArgs });

  if (!command) return logger.error('No command found');
  const handlerFunc = commandsManager.actions[command];
  const replyMsg = handlerFunc(extraArgs);
  if (!replyMsg) return logger.error('No msg');

  msg.reply(replyMsg);
});

client.login(process.env.TOKEN);
