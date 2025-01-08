const bch = require('../BotCommandsHelper');

const handleHelp = (extraArgs, lang) => {
  return bch.config.HELP[lang];
};

const handleInfo = (extraArgs, lang) => {
  return bch.config.INFO[lang];
};

const handleLc = (extraArgs, lang) => {
  return bch.config.COMMANDS;
};

module.exports = {
  handleHelp,
  handleInfo,
  handleLc,
};
