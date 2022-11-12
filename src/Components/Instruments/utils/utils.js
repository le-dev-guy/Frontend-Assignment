export const filterExpiredInstruments = (quotes, callee) => {
  let data = quotes.filter(
    (quote) => new Date(quote.valid_till).getTime() > new Date().getTime()
  );
  return data;
};
