export const getTotalSalesDetails = (sales) => {
  let total = 0;
  let paidSum = 0;
  sales.forEach((sale) => {
    total += Number(sale.price);
    paidSum += Number(sale.paid);
  });

  return [total, paidSum];
};

//calculate amount to be paid
export const getDebtDetails = (debts) => {
  let debtSum = 0;

  debts.forEach((debt) => {
    debtSum += Number(debt.balance);
  });

  return debtSum;
};

export const getExpenseSum = (expenses) => {
  let expenseSum = 0;

  expenses.forEach((expense) => {
    expenseSum += Number(expense.amount);
  });

  return expenseSum;
};

export const getClearanceDetails = (clearance) => {
  let clearanceSum = 0;

  clearance.forEach((aClearance) => {
    clearanceSum += Number(aClearance.paid);
  });

  return clearanceSum;
};

//get sale ppmu
const getSalePpmu = (id, stocks) => {
  let ppmu;
  return stocks.filter((stock) => {
    return id.toUpperCase() == stock.id.toUpperCase();
  })[0].bought;
};

//get sales for this date
const getCurrentSalesDetails = (sales, stocks, date) => {
  let match = sales.filter((sale) => {
    let currentDate = new Date(sale.date);
    return (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    );
  });

  //get values
  let totalPrice = 0;
  let paidSum = 0;
  let currentGain = 0;

  //match represents all sales for a particular day
  match.forEach((sale) => {
    let ppmu = getSalePpmu(sale.productId, stocks);

    let cp = ppmu * sale.quantity;
    let sp = sale.price;

    currentGain += Number(sp - cp);
    totalPrice += sale.price;
    paidSum += sale.paid;
  });

  return [totalPrice, paidSum, currentGain];
};

//filter clearance for this date
const getCurrentDebtsPaidIn = (allClearance, date) => {
  let match = allClearance.filter((clearance) => {
    let currentDate = new Date(clearance.date);
    return (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    );
  });

  //get values
  let debtPaid = 0;

  match.forEach((clearance) => {
    debtPaid += clearance.paid;
  });

  return debtPaid;
};

//calculate debts still to be paid
const getCurrentDebt = (debts, date) => {
  let match = debts.filter((debt) => {
    let currentDate = new Date(debt.date);
    return (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    );
  });

  //get values
  let debt = 0;

  match.forEach((myDebt) => {
    debt += myDebt.balance;
  });

  return debt;
};

//calculate expenses
const getCurrentExpense = (expenses, date) => {
  let match = expenses.filter((expense) => {
    let currentDate = new Date(expense.date);
    return (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    );
  });

  //get values
  let expense = 0;

  match.forEach((myExpense) => {
    expense += myExpense.amount;
  });

  return expense;
};

export const generateReport = (
  dates,
  debts,
  expenses,
  sales,
  allClearance,
  stocks
) => {
  let reportArray = [];
  let id = 0;
  let lastGain = 0;

  //loop through all dates
  dates.forEach((date) => {
    id++;
    //filter details for this date
    let [totalPrice, paidSum, currentGain] = getCurrentSalesDetails(
      sales,
      stocks,
      date
    );

    console.log(lastGain, currentGain);
    let gainPercent = isNaN(Number(((currentGain - lastGain) / lastGain) * 100))
      ? 0
      : isFinite(Number(((currentGain - lastGain) / lastGain) * 100))
      ? Number(((currentGain - lastGain) / lastGain) * 100).toFixed(2)
      : currentGain;
    let debtPaid = getCurrentDebtsPaidIn(allClearance, date);
    let debt = getCurrentDebt(debts, date);
    let expense = getCurrentExpense(expenses, date);
    let balance = Number(paidSum + debtPaid - expense);

    //make object for each report
    let obj = {};
    obj.date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    obj.id = id;
    obj.totalPrice = totalPrice;
    obj.paid = paidSum;
    obj.debtPaid = debtPaid;
    obj.debt = debt;
    obj.expense = expense;
    obj.balance = balance;
    obj.gainPercent = gainPercent;

    //change last gain
    lastGain = currentGain;
    //add to array
    reportArray = [...reportArray, obj];
  });

  return reportArray;
};
