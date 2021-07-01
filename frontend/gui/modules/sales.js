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

export const extractSales = (dates, sales) => {
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

export const getSaleSearchResult = (sales, detail) => {
  let searchArray = sales.filter((sale) => {
    return (
      sale.transactionType.toUpperCase().includes(detail.toUpperCase()) ||
      sale.productName.toUpperCase().includes(detail.toUpperCase()) ||
      sale.productId.toUpperCase().includes(detail.toUpperCase())
    );
  });

  return searchArray;
};

//get others
export const getOthers = (sales) => {
  let total = 0;
  let credits = 0;
  let onlines = 0;
  let cashs = 0;
  let discounts = 0;
  let balance = 0;
  let discount = 0;

  sales.forEach((sale) => {
    total += Number(sale.price);

    discounts += Number(sale.discount);
    if (sale.transactionType.toUpperCase() == "CASH") {
      cashs += Number(sale.price);
    } else if (sale.transactionType.toUpperCase() == "ONLINE") {
      onlines += Number(sale.price);
    } else if (sale.transactionType.toUpperCase() == "CREDIT") {
      credits += Number(sale.price);
    }
  });

  discount = discounts != 0 ? discounts / sales.length : 0;

  balance =
    discount != 0 && total != 0
      ? Math.ceil(total - (discount * total) / 100)
      : 0;

  //return an array of values
  return [total, cashs, onlines, credits, discount, balance];
};

export const extractTypeSales = (sales, type) => {
  let match = sales.filter((sale) => {
    return sale.transactionType.toUpperCase() == type.toUpperCase();
  });

  return match;
};
