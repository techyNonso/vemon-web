export const sortBranches = (branches) => {
  function compare(a, b) {
    //compare object "A" with object "B"
    const nameA = a.branchId.toUpperCase();
    const nameB = b.branchId.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }

    return comparison;
  }

  //check length of array

  if (branches.length > 0) {
    //sort the array
    let sortedArray = branches.sort(compare);

    return sortedArray;
  } else {
    return branches;
  }
};

export const getSearchResult = (branches, detail) => {
  let searchArray = branches.filter((branch) => {
    return branch.branchId.toUpperCase().includes(detail.toUpperCase());
  });

  return searchArray;
};
