const bch = require('./BotCommandsHelper');

const handleHelp = (extraArgs, lang) => {
  return bch.config.HELP[lang];
};

const handleInfo = (extraArgs, lang) => {
  return bch.config.INFO[lang];
};

const handleLc = (extraArgs, lang) => {
  return bch.config.COMMANDS;
};

const actions = {
  help: handleHelp,
  info: handleInfo,
  lc: handleLc,
};

const perform = async (command, extraArgs) => {
  const lang = extraArgs.length ? extraArgs[0] : 'pt';

  if (!actions[command]) return;

  return await actions[command](extraArgs, lang);
};

module.exports.perform = perform;
