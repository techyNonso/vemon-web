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
