export const sortCompanies = (companies) => {
  function compare(a, b) {
    //compare object "A" with object "B"
    const nameA = a.companyName.toUpperCase();
    const nameB = b.companyName.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }

    return comparison;
  }

  //check length of array

  if (companies.length > 0) {
    //sort the array
    let sortedArray = companies.sort(compare);

    return sortedArray;
  } else {
    return companies;
  }
};

export const getSearchResult = (companies, detail) => {
  let searchArray = companies.filter((company) => {
    return (
      company.companyId.toUpperCase().includes(detail.toUpperCase()) ||
      company.companyName.toUpperCase().includes(detail.toUpperCase()) ||
      company.plan.toUpperCase().includes(detail.toUpperCase())
    );
  });

  return searchArray;
};
