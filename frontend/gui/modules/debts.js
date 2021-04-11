export const extractDates = (start, end) => {
  //get array of dates between the two dates
  let dateArray = [];

  let dt = new Date(start);
  while (dt <= end) {
    dateArray = [...dateArray, new Date(dt)];
    dt.setDate(dt.getDate() + 1);
  }
  //get the last day if its not same with the first day
  if (
    start.getFullYear() !== end.getFullYear() &&
    start.getMonth() !== end.getMonth() &&
    start.getDate() !== end.getDate()
  ) {
    dateArray = [...dateArray, end];
  }

  return dateArray;
};

export const extractDebts = (dates, debts) => {
  let debtsArray = [];
  dates.forEach((date) => {
    //loop through activities
    debts.forEach((debt) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let debtsDate = new Date(debt.date);
      let debtsYear = debtsDate.getFullYear();
      let debtsMonth = debtsDate.getMonth();
      let debtsDay = debtsDate.getDate();

      if (year == debtsYear && month == debtsMonth && day == debtsDay) {
        debtsArray = [...debtsArray, debt];
      }
    });
  });

  return debtsArray;
};

export const getOthers = (debts) => {
  let total = 0;
  let paid = 0;
  let balance = 0;

  debts.forEach((debt) => {
    total += Number(debt.net_price);
    paid += Number(debt.paid);
    balance += Number(debt.balance);
  });

  return [total, paid, balance];
};

export const getSearchResult = (debts, detail) => {
  let searchArray = debts.filter((debt) => {
    return (
      debt.customer.toUpperCase().includes(detail.toUpperCase()) ||
      debt.attender.toUpperCase().includes(detail.toUpperCase())
    );
  });

  return searchArray;
};
