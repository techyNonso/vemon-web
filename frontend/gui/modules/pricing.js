export const getCodeDetail = (list) => {
  let standard,
    pro,
    maxi,
    advance = {};

  list.forEach((item) => {
    if (item.code == 0) {
      standard = item;
    } else if (item.code == 1) {
      pro = item;
    } else if (item.code == 2) {
      maxi = item;
    } else if (item.code == 3) {
      advance = item;
    }
  });

  return { standard, pro, maxi, advance };
};

export const getAmount = (plan, standard, pro, maxi, advance) => {
  let price;
  switch (plan.toUpperCase()) {
    case "STANDARD":
      price = standard.price;
      break;
    case "PREMIUM PRO":
      price = pro.price;
      break;
    case "PREMIUM MAXI":
      price = maxi.price;
      break;
    case "PREMIUM ADVANCE":
      price = advance.price;
      break;

    default:
      break;
  }

  return price;
};

export const getAmtRemaining = (plan, standard, pro, maxi, advance, days) => {
  let amt;
  switch (plan.toUpperCase()) {
    case "STANDARD":
      amt = standard.daily_charge;
      break;
    case "PREMIUM PRO":
      amt = pro.daily_charge;
      break;
    case "PREMIUM MAXI":
      amt = maxi.daily_charge;
      break;
    case "PREMIUM ADVANCE":
      amt = advance.daily_charge;
      break;

    default:
      break;
  }

  return amt * days;
};

export const getDaysValue = (plan, amt, standard, pro, maxi, advance) => {
  let charge;
  switch (plan.toUpperCase()) {
    case "STANDARD":
      charge = standard.daily_charge;
      break;
    case "PREMIUM PRO":
      charge = pro.daily_charge;
      break;
    case "PREMIUM MAXI":
      charge = maxi.daily_charge;
      break;
    case "PREMIUM ADVANCE":
      charge = advance.daily_charge;
      break;

    default:
      break;
  }

  return Math.round(amt / charge);
};
export const notExpired = (date) => {
  let oldDate = new Date(date);
  let now = new Date();
  now.setHours(0, 0, 0, 0);

  if (oldDate > now) {
    return true;
  } else {
    return false;
  }
};
export const updateCondition = (
  newPlan,
  company,
  standard,
  pro,
  maxi,
  advance
) => {
  let date = new Date(company.expiryDate);
  let now = new Date();

  let diffTime = Math.abs(date - now);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    //get amount remaining
    let amtLeft = getAmtRemaining(
      company.plan,
      standard,
      pro,
      maxi,
      advance,
      diffDays
    );
    //get number of days it will give us
    let daysValue = getDaysValue(
      newPlan,
      amtLeft,
      standard,
      pro,
      maxi,
      advance
    );
    //check if subscription is expired
    if (notExpired(date)) {
      //return days remaining
      if (daysValue > 0) {
        //get a new expiry date
        let newExp = new Date(now.setDate(now.getDate() + daysValue));
        return { daysValue, newExp };
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
