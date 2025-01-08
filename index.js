const Discord = require('discord.js');
const bch = require('./BotCommandsHelper');
const { logger } = require('./Logger');
const commandsManager = require('./CommandsManager');

require('dotenv').config();

const RANDOM_ACTIVITY = Math.floor(Math.random() * 4);

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  client.user.setPresence({
    activities: [
      {
        name: bch.config.ACTIVITIES[RANDOM_ACTIVITY],
        type: Discord.ActivityType.Custom,
      },
    ],
    status: 'dnd',
  });
});

client.on('messageCreate', async (msg) => {
  if (!msg.content.startsWith(bch.config.PREFIX))
    return logger.error('Wrong prefix');

  const command = msg.content.split(' ')[0].slice(1); // remove prefix
  const extraArgs = msg.content.split(' ').slice(1);
  logger.info({ command, extraArgs });

  if (!command) return logger.error('No command found');

  const replyMsg = await commandsManager.perform(command, extraArgs);

  if (!replyMsg) return logger.error('No msg');

  msg.reply(replyMsg);
});

client.login(process.env.TOKEN);
