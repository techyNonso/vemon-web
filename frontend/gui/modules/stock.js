// all stock management functions live here

import { object } from "prop-types";

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
