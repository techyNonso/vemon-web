export const extractSales = (dates, sales) => {
  //add previous day date to date array
  let firstDay = new Date(dates[0]);
  let prevDay = new Date(firstDay.setDate(firstDay.getDate() - 1));
  dates = [prevDay, ...dates];
  let salesArray = [];
  dates.forEach((date) => {
    //loop through activities
    sales.forEach((sale) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let salesDate = new Date(sale.date);
      let salesYear = salesDate.getFullYear();
      let salesMonth = salesDate.getMonth();
      let salesDay = salesDate.getDate();

      if (year == salesYear && month == salesMonth && day == salesDay) {
        salesArray = [...salesArray, sale];
      }
    });
  });

  return salesArray;
};

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
  let totalCp = 0;
  let totalSp = 0;

  //match represents all sales for a particular day
  match.forEach((sale) => {
    let ppmu = getSalePpmu(sale.productId, stocks);

    let cp = ppmu * sale.quantity;
    let sp = sale.price;
    totalSp += sp;
    totalCp += cp;
    currentGain += Number(sp - cp);
    totalPrice += sale.price;
    paidSum += sale.paid;
  });

  return [totalPrice, paidSum, currentGain, totalCp, totalSp];
};

//get details for day 1 prev day
const getPrevSalesDetails = (sales, stocks, date) => {
  let match = sales.filter((sale) => {
    let currentDate = new Date(sale.date);
    return (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    );
  });

  //get values
  let prevTotalPrice = 0;
  let prevPaidSum = 0;
  let prevCurrentGain = 0;
  let prevTotalCp = 0;
  let prevTotalSp = 0;

  //match represents all sales for a particular day
  match.forEach((sale) => {
    let ppmu = getSalePpmu(sale.productId, stocks);

    let cp = ppmu * sale.quantity;
    let sp = sale.price;
    prevTotalSp += sp;
    prevTotalCp += cp;
    prevCurrentGain += Number(sp - cp);
    prevTotalPrice += sale.price;
    prevPaidSum += sale.paid;
  });

  return [
    prevTotalPrice,
    prevPaidSum,
    prevCurrentGain,
    prevTotalCp,
    prevTotalSp,
  ];
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
  //get previous day from first day details
  let firstDay = new Date(dates[0]);

  let prevDay = new Date(firstDay.setDate(firstDay.getDate() - 1));
  //get details for a day before the first day
  let [
    prevTotalPrice,
    prevPaidSum,
    prevCurrentGain,
    prevTotalCp,
    prevTotalSp,
  ] = getPrevSalesDetails(sales, stocks, prevDay);

  let reportArray = [];
  let id = 0;
  let lastGain = prevCurrentGain;
  let lastDate = `${
    prevDay.getMonth() + 1
  }-${prevDay.getDate()}-${prevDay.getFullYear()}`;
  let currentDate = "";
  let lastSale = prevTotalSp;
  let currentSale = "";
  let lastCost = prevTotalCp;
  let currentCost = "";

  //loop through all dates
  dates.forEach((date) => {
    id++;
    //filter details for this date
    let [
      totalPrice,
      paidSum,
      currentGain,
      totalCp,
      totalSp,
    ] = getCurrentSalesDetails(sales, stocks, date);

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
    obj.currentDate = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    obj.currentSale = totalSp;
    obj.currentCost = totalCp;
    obj.lastSale = lastSale;
    obj.lastCost = lastCost;
    obj.lastDate = lastDate;
    obj.currentGain = currentGain;
    obj.lastGain = lastGain;

    //change last values
    lastGain = currentGain;
    lastDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    lastSale = totalSp;
    lastCost = totalCp;
    //add to array
    reportArray = [...reportArray, obj];
  });

  return reportArray;
};
