export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'GBP',
    mimimumFractionDigits: 2,
  };

  // check if its a clean pound amount
  if (amount % 100 === 0) {
    options.mimimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
}
