export const currencyFomatter = (prices: Number): string => {
    if (prices) {
      return prices.toLocaleString("it-IT") + "đ"
    }
    return "0đ"
  };