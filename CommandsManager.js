const bch = require('./BotCommandsHelper');

const handleHelp = (extraArgs) => {
  const lang = extraArgs.length ? extraArgs[0] : 'pt';

  return bch.config.HELP[lang];
};

const handleInfo = (extraArgs) => {
  const lang = extraArgs.length ? extraArgs[0] : 'pt';

  return bch.config.INFO[lang];
};

const handleLc = (extraArgs) => {
  const lang = extraArgs.length ? extraArgs[0] : 'pt';

  return bch.config.COMMANDS;
};

actions = {
  help: handleHelp,
  info: handleInfo,
  lc: handleLc,
};

module.exports.actions = actions;
