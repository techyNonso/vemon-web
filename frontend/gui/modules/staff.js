export const getSearchResult = (allStaff, detail) => {
  let searchArray = allStaff.filter((staff) => {
    return (
      staff.staffId.toUpperCase().includes(detail.toUpperCase()) ||
      staff.staffName.toUpperCase().includes(detail.toUpperCase()) ||
      staff.position.toUpperCase().includes(detail.toUpperCase()) ||
      staff.permission.toUpperCase().includes(detail.toUpperCase())
    );
  });

  return searchArray;
};

export const getAttendanceSearchResult = (allAttendance, detail) => {
  let searchArray = allAttendance.filter((attendance) => {
    return (
      attendance.staffId.toUpperCase().includes(detail.toUpperCase()) ||
      attendance.staffName.toUpperCase().includes(detail.toUpperCase())
    );
  });

  return searchArray;
};

export const sortStaff = (allStaff) => {
  function compare(a, b) {
    //compare object "A" with object "B"
    const nameA = a.staffId.toUpperCase();
    const nameB = b.staffId.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }

    return comparison;
  }

  //check length of array

  if (allStaff.length > 0) {
    //sort the array
    let sortedArray = allStaff.sort(compare);

    return sortedArray;
  } else {
    return allStaff;
  }
};

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

export const extractAttendance = (dates, allAttendance) => {
  let allAttendanceArray = [];
  dates.forEach((date) => {
    //loop through activities
    allAttendance.forEach((attendance) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let allAttendanceDate = new Date(attendance.date);
      let allAttendanceYear = allAttendanceDate.getFullYear();
      let allAttendanceMonth = allAttendanceDate.getMonth();
      let allAttendanceDay = allAttendanceDate.getDate();

      if (
        year == allAttendanceYear &&
        month == allAttendanceMonth &&
        day == allAttendanceDay
      ) {
        allAttendanceArray = [...allAttendanceArray, attendance];
      }
    });
  });

  return allAttendanceArray;
};
