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

export const getTotalInvoicesDetails = (invoices) => {
  //console.table(sales)
  let total = 0;
  let paidSum = 0;
  invoices.forEach((invoice) => {
    total += Number(invoice.net_price);
    paidSum += Number(invoice.paid);
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

//get unit sold
const getProductUnit = (stocks, id) => {
  return stocks.filter((stock) => {
    return id.toUpperCase() == stock.id.toUpperCase();
  })[0].unit;
};

//get sales for this date
const getCurrentSalesDetails = (sales, invoices, stocks, date) => {
  /*let match = sales.filter((sale) => {
    let currentDate = new Date(sale.date);
    return (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    );
  });*/

  //get invoices for this date
  let invoiceMatch = invoices.filter((invoice) => {
    let currentDate = new Date(invoice.date);
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

  //get total money Paid from receipt
  invoiceMatch.forEach((invoice) => {
    paidSum += Number(invoice.paid);
    let cp = Number(invoice.cost_price);
    let sp = Number(invoice.selling_price);
    totalSp += Number(sp);
    totalCp += Number(cp);
    currentGain += Number(sp - cp);
    totalPrice += Number(invoice.total_price);
  });

  //match represents all sales for a particular day
  /* match.forEach((sale) => {
    let ppmu = getSalePpmu(sale.productId, stocks);
    //get product unit
    let productUnit = getProductUnit(stocks, sale.productId);
    //let unitSold = Number(sale.quantity / productUnit);
    let cp = Number(sale.cost_price)
    let sp = Number(sale.selling_price);
    totalSp += Number(sp);
    totalCp += Number(cp);
    currentGain += Number(sp - cp);
    totalPrice += Number(sale.price);
  });*/

  return [totalPrice, paidSum, currentGain, totalCp, totalSp];
};

//get details for day 1 prev day
const getPrevSalesDetails = (
  sales,
  invoices,
  stocks,
  date,
  prevInvoices,
  prevSales
) => {
  /*let match = sales.filter((sale) => {
    let currentDate = new Date(sale.date);

    return (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    );
  });*/

  //get invoices for this date
  /*let invoiceMatch = invoices.filter((invoice) => {
    let currentDate = new Date(invoice.date);
    return (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear()
    );
  });*/

  let invoiceMatch = prevInvoices;

  //get values
  let prevTotalPrice = 0;
  let prevPaidSum = 0;
  let prevCurrentGain = 0;
  let prevTotalCp = 0;
  let prevTotalSp = 0;

  //match represents all sales from yesterday
  /*prevSales.forEach((sale) => {
    let ppmu = getSalePpmu(sale.productId, stocks);

    prevTotalSp += Number(sale.selling_price);
    prevTotalCp += Number(sale.cost_price);
    prevCurrentGain += Number(sp - cp);
    prevTotalPrice += Number(sale.price);
  });*/

  //get total money Paid from receipt and analysis
  invoiceMatch.forEach((invoice) => {
    prevPaidSum += Number(invoice.paid);
    prevTotalSp += Number(invoice.selling_price);
    prevTotalCp += Number(invoice.cost_price);
    prevCurrentGain += Number(prevTotalSp - prevTotalCp);
    prevTotalPrice += Number(invoice.total_price);
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
    debtPaid += Number(clearance.paid);
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
    debt += Number(myDebt.balance);
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
    expense += Number(myExpense.amount);
  });

  return expense;
};

export const generateReport = (
  dates,
  debts,
  expenses,
  sales,
  invoices,
  allClearance,
  stocks,
  previousInvoices,
  prevSales
) => {
  //console.log(sales);
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
  ] = getPrevSalesDetails(
    sales,
    invoices,
    stocks,
    prevDay,
    previousInvoices,
    prevSales
  );

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
    ] = getCurrentSalesDetails(sales, invoices, stocks, date);

    let gainPercent = isNaN(Number(((currentGain - lastGain) / lastGain) * 100))
      ? 0
      : isFinite(Number(((currentGain - lastGain) / lastGain) * 100))
      ? Number(((currentGain - lastGain) / lastGain) * 100).toFixed(1)
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

//report for monthly sale
export const getMonthlyAnalysis = (sales) => {
  //console.table(sales)
  let report = {
    Jan: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Feb: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Mar: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Apr: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    May: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Jun: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Jul: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Aug: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Sep: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Oct: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Nov: {
      online: 0,
      cash: 0,
      credit: 0,
    },
    Dec: {
      online: 0,
      cash: 0,
      credit: 0,
    },
  };

  //loop through the sale
  sales.forEach((sale) => {
    //add sales for each month
    switch (new Date(sale.date).getMonth()) {
      case 0:
        report.Jan = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Jan.online + 1
              : report.Jan.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Jan.cash + 1
              : report.Jan.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Jan.credit + 1
              : report.Jan.credit + 0,
        };
        break;
      case 1:
        report.Feb = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Feb.online + 1
              : report.Feb.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Feb.cash + 1
              : report.Feb.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Feb.credit + 1
              : report.Feb.credit + 0,
        };
        break;
      case 2:
        report.Mar = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Mar.online + 1
              : report.Mar.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Mar.cash + 1
              : report.Mar.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Mar.credit + 1
              : report.Mar.credit + 0,
        };
        break;
      case 3:
        report.Apr = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Apr.online + 1
              : report.Apr.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Apr.cash + 1
              : report.Apr.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Apr.credit + 1
              : report.Apr.credit + 0,
        };
        break;
      case 4:
        report.May = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.May.online + 1
              : report.May.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.May.cash + 1
              : report.May.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.May.credit + 1
              : report.May.credit + 0,
        };
        break;
      case 5:
        report.Jun = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Jun.online + 1
              : report.Jun.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Jun.cash + 1
              : report.Jun.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Jun.credit + 1
              : report.Jun.credit + 0,
        };
        break;
      case 6:
        report.Jul = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Jul.online + 1
              : report.Jul.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Jul.cash + 1
              : report.Jul.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Jul.credit + 1
              : report.Jul.credit + 0,
        };
        break;
      case 7:
        report.Aug = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Aug.online + 1
              : report.Aug.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Aug.cash + 1
              : report.Aug.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Aug.credit + 1
              : report.Aug.credit + 0,
        };
        break;
      case 8:
        report.Sep = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Sep.online + 1
              : report.Sep.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Sep.cash + 1
              : report.Sep.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Sep.credit + 1
              : report.Sep.credit + 0,
        };
        break;
      case 9:
        report.Oct = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Oct.online + 1
              : report.Oct.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Oct.cash + 1
              : report.Oct.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Oct.credit + 1
              : report.Oct.credit + 0,
        };
        break;
      case 10:
        report.Nov = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Nov.online + 1
              : report.Nov.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Nov.cash + 1
              : report.Nov.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Nov.credit + 1
              : report.Nov.credit + 0,
        };
        break;
      case 11:
        report.Dec = {
          online:
            sale.transactionType.toUpperCase() == "ONLINE"
              ? report.Dec.online + 1
              : report.Dec.online + 0,
          cash:
            sale.transactionType.toUpperCase() == "CASH"
              ? report.Dec.cash + 1
              : report.Dec.cash + 0,
          credit:
            sale.transactionType.toUpperCase() == "CREDIT"
              ? report.Dec.credit + 1
              : report.Dec.credit + 0,
        };
        break;
      default:
        break;
    }
  });
  return report;
};

//report for monthly sale
export const getMonthlySalesReport = (sales) => {
  //console.table(sales)
  let report = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  //loop through the sale
  sales.forEach((sale) => {
    //add sales for each month
    switch (new Date(sale.date).getMonth()) {
      case 0:
        report.Jan = report.Jan + sale.price;
        break;
      case 1:
        report.Feb = report.Feb + sale.price;
        break;
      case 2:
        report.Mar = report.Mar + sale.price;
        break;
      case 3:
        report.Apr = report.Apr + sale.price;
        break;
      case 4:
        report.May = report.May + sale.price;
        break;
      case 5:
        report.Jun = report.Jun + sale.price;
        break;
      case 6:
        report.Jul = report.Jul + sale.price;
        break;
      case 7:
        report.Aug = report.Aug + sale.price;
        break;
      case 8:
        report.Sep = report.Sep + sale.price;
        break;
      case 9:
        report.Oct = report.Oct + sale.price;
        break;
      case 10:
        report.Nov = report.Nov + sale.price;
        break;
      case 11:
        report.Dec = report.Dec + sale.price;
        break;
      default:
        break;
    }
  });
  return report;
};

const getIds = (branches) => {
  let ids = [];
  branches.forEach((branch) => (ids = [...ids, branch.branchId]));
  return ids;
};

/*
const getObjectOfArray= (ids) => {
  return ids.reduce((acc,curr) => (acc[curr]=0,acc),{})
}
*/
const getBranchReport = (ids, sales) => {
  let report = [];

  ids.forEach((id) => {
    //loop through sales
    let totalSales = 0;
    sales.forEach((sale) => {
      totalSales =
        sale.branchId.toUpperCase() == id.toUpperCase()
          ? totalSales + sale.price
          : totalSales + 0;
    });

    //add the branch to report
    report = [...report, { id: id, total: totalSales }];
  });

  return report;
};

//get branches performance
export const getBranchPerformance = (branches, sales) => {
  //get all the branch ids
  let ids = getIds(branches);

  //get sales for each branch
  let report = getBranchReport(ids, sales);
};
