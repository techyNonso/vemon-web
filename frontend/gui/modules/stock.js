// all stock management functions live here

// all stock page
import { object } from "prop-types";
import expiredStock from "../components/dashComponents/expiredStock";

export const extractProductId = (stock) => {
  let idArray = [];
  stock.forEach((product) => {
    idArray.includes(product.productId) ? "" : idArray.push(product.productId);
  });

  return idArray;
};

export const getStockArray = (ids, stock) => {
  let stockArray = [];

  ids.forEach((id) => {
    let obj = {
      id: "",
      name: "",
      qty: "",
      batches: "",
      bought: "",
      sold: "",
      unit: "",
    };
    let ppmu = 0;
    let counter = 0;
    let averagePpmu = 0;
    stock.forEach((product) => {
      if (id == product.productId) {
        counter++;
        //assign id
        obj.id = product.productId;
        //assign name
        obj.name = product.productName;
        obj.unit = product.unit;
        //assign quantity
        obj.qty = Number(obj.qty) + Number(product.quantity);
        //assign batch
        obj.batches = Number(obj.batches) + 1;
        //assign selling price
        obj.sold = product.price;

        //assgin ppmu which is cost price
        ppmu = Number(ppmu) + Number(product.ppmu);
      }
    });

    averagePpmu = ppmu / counter;
    //assign avgppmu as correct cost price
    obj.bought = averagePpmu;

    stockArray.push(obj);
  });

  return stockArray;
};

export const getTotalQty = (stock) => {
  let total = 0;
  stock.forEach((product) => {
    total = Number(total) + Number(product.quantity);
  });

  return total;
};

//get total batches which is same with number of products occurance
export const getTotalBatches = (stocks) => stocks.length;

//get result of search
export const getSearchResult = (stock, detail) => {
  let match = stock.filter((product) => {
    return (
      product.id.toUpperCase().includes(detail.toUpperCase()) ||
      product.name.toUpperCase().includes(detail.toUpperCase())
    );
  });

  return match;
};

// exhausted stock
export const getLowStock = (stock) => {
  let match = stock.filter((product) => {
    return product.qty <= 20;
  });

  return match;
};

//expired stock
export const getExpiredStock = (stock, limit) => {
  let date1 = new Date();

  let expiredArray = [];

  stock.forEach((product) => {
    let obj = {};
    if (product.expiryDate !== "") {
      let date2 = new Date(product.expiryDate);
      let diff_time = date2.getTime() - date1.getTime();
      let diff_days = Math.ceil(diff_time / (1000 * 3600 * 24));
      if (diff_days <= limit) {
        (obj.name = product.productName),
          (obj.id = product.productId),
          (obj.batchId = product.batchId),
          (obj.rowId = product.id),
          (obj.date = product.expiryDate),
          (obj.qty = product.quantity),
          (obj.life = diff_days);

        //push into array
        expiredArray.push(obj);
      }
    }
  });

  function compare(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }

    return comparison;
  }

  if (expiredArray.length > 0) {
    //sort the array
    let sortedArray = expiredArray.sort(compare);

    return sortedArray;
  } else {
    return expiredArray;
  }
};

//stock activities
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

//extract activities
export const extractActivities = (dates, activities) => {
  let actsArray = [];
  dates.forEach((date) => {
    //loop through activities
    activities.forEach((act) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let actDate = new Date(act.date);
      let actYear = actDate.getFullYear();
      let actMonth = actDate.getMonth();
      let actDay = actDate.getDate();

      if (year == actYear && month == actMonth && day == actDay) {
        actsArray = [...actsArray, act];
      }
    });
  });

  return actsArray;
};

//get result of search for acts
export const getActSearchResult = (acts, detail) => {
  let match = acts.filter((act) => {
    return (
      act.editorId.toUpperCase().includes(detail.toUpperCase()) ||
      act.editor.toUpperCase().includes(detail.toUpperCase())
    );
  });

  return match;
};

//get search result for report
export const getReportSearchResult = (reports, detail) => {
  let match = reports.filter((report) => {
    return (
      report.name.toUpperCase().includes(detail.toUpperCase()) ||
      report.productId.toUpperCase().includes(detail.toUpperCase())
    );
  });

  return match;
};

const getAllMatchingSales = (id, sales) => {
  let match = sales.filter((sale) => {
    return id.toUpperCase() == sale.productId.toUpperCase();
  });

  return match;
};

const calcAllTotal = (sales) => {
  let total = 0;
  sales.forEach((sale) => {
    total += Number(sale.quantity);
  });

  return total;
};

const calcTotal = (salesList, priceBought) => {
  let total = 0;
  let totalPrice = 0;
  let gain = 0;

  let cp = 0;
  salesList.forEach((sale) => {
    total += Number(sale.quantity);
    cp += Number(sale.cost_price);
    totalPrice += Number(sale.selling_price);
  });

  gain = totalPrice - cp;
  return [total, gain];
};

//calculate percentage gain
const calcGainPercs = (reports, totalGain) => {
  reports.forEach((report) => {
    report.gain = isNaN((report.gain / totalGain) * 100)
      ? 0
      : ((report.gain / totalGain) * 100).toFixed(2);
  });

  return reports;
};

//generate product report
export const generateProductReport = (stocks, sales) => {
  if (sales !== undefined && stocks !== undefined) {
    let reports = [];
    let allTotal = calcAllTotal(sales);
    let totalGain = 0;

    stocks.forEach((product) => {
      let obj = {};
      let salesList = getAllMatchingSales(product.id, sales);
      let [total, gain] = calcTotal(salesList, product.bought);
      totalGain += gain;
      obj.name = product.name;
      obj.productId = product.id;
      obj.total = total;
      obj.gain = isNaN(gain) ? 0 : gain;
      obj.percVolume = isNaN((total / allTotal) * 100)
        ? 0
        : ((total / allTotal) * 100).toFixed(2);

      reports = [...reports, obj];
    });

    //add percentage gain to report
    let mainReports =
      reports.length > 0 ? calcGainPercs(reports, totalGain) : reports;

    return mainReports;
  }
};
