const bovespa = require('bovespa')();

const getPrice = (extraArgs, lang) => {
  bovespa(extraArgs[0]).then((values) => {
    console.log(values);
  });
};

module.exports = {
  getPrice,
};
