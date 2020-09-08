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

export const extractExpenses = (dates, expenses) => {
  let expensesArray = [];
  dates.forEach((date) => {
    //loop through activities
    expenses.forEach((expense) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let expensesDate = new Date(expense.date);
      let expensesYear = expensesDate.getFullYear();
      let expensesMonth = expensesDate.getMonth();
      let expensesDay = expensesDate.getDate();

      if (
        year == expensesYear &&
        month == expensesMonth &&
        day == expensesDay
      ) {
        expensesArray = [...expensesArray, expense];
      }
    });
  });

  return expensesArray;
};

export const getSearchResult = (expenses, detail) => {
  let searchArray = expenses.filter((expense) => {
    return expense.name.toUpperCase().includes(detail.toUpperCase());
  });

  return searchArray;
};

export const getOthers = (expenses) => {
  let total = 0;
  expenses.forEach((expense) => {
    total += Number(expense.amount);
  });

  return total;
};
