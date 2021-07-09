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
