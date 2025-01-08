const getTickerQuota = async (ticker) => {
  if (!ticker) return;

  const url = `https://b3api.me/api/quote/${ticker}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getPrice = async (extraArgs, lang) => {
  const ticker = extraArgs[0];

  const quotaData = await getTickerQuota(ticker);
  if (!quotaData)
    return 'Not returning results - b3api.me not working well at this time.';

  return `Preço ${ticker}: ${quotaData.price}`;
};

module.exports = {
  getPrice,
};
