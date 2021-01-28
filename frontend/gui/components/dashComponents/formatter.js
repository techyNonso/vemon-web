class Formatter {
  format(money) {
    //ensure two decimal places
    let amount = Number(money).toFixed(2);
    //add commas where needed
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //return amount
    return amount;
  }
}

export default new Formatter();
