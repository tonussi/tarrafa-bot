const { handleHelp, handleInfo, handleLc } = require('./commands/Basics');
const { getPrice } = require('./commands/Bolsa');

const actions = {
  h: handleHelp,
  i: handleInfo,
  lc: handleLc,
  gp: getPrice,
};

const perform = async (command, extraArgs) => {
  const lang = extraArgs.length ? extraArgs[0] : 'pt';

  if (!actions[command]) return;

  const res = await actions[command](extraArgs, lang);

  return res;
};

module.exports.perform = perform;
