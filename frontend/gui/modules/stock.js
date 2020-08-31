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
