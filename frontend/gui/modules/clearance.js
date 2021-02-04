export const extractClearance = (dates, clearance) => {
  let clearanceArray = [];
  dates.forEach((date) => {
    //loop through activities
    clearance.forEach((singleClearance) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let clearanceDate = new Date(singleClearance.date);
      let clearanceYear = clearanceDate.getFullYear();
      let clearanceMonth = clearanceDate.getMonth();
      let clearanceDay = clearanceDate.getDate();

      if (
        year == clearanceYear &&
        month == clearanceMonth &&
        day == clearanceDay
      ) {
        clearanceArray = [...clearanceArray, singleClearance];
      }
    });
  });

  return clearanceArray;
};
