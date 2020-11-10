export const sortBranches = (branches) => {
  function compare(a, b) {
    //compare object "A" with object "B"
    const nameA = Number(a.id);
    const nameB = Number(b.id);

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

const getId = () => {
  return "BR" + Math.floor(1000 + Math.random() * 1000);
};

const checkId = (branches, currId) => {
  //filter out matching branch id
  let match = branches.filter((branch) => {
    return branch.branchId.toUpperCase() == currId.toUpperCase();
  });

  if (match.length > 0) {
    return true;
  }

  return false;
};

export const generateBranchId = (branches) => {
  //get id
  let id = getId();
  if (branches.length == 0) {
    return id;
  } else {
    //filter branch with same id
    let idExist = true;
    let currId;
    while (idExist) {
      currId = getId();
      idExist = checkId(branches, currId);
    }

    return currId;
  }
};
