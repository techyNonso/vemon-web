class Auth {
  login() {
    localStorage.setItem("IsManagerfrontOnline", true);
  }
  isAuthenticated() {
    if (localStorage.getItem("IsManagerfrontOnline") == "true") {
      return true;
    } else {
      return false;
    }
  }
  isNotCredentialPage(path) {
    let pathArray = path.split("/");
    //check if user is going to credential page
    if (
      pathArray.indexOf("signup") == -1 &&
      pathArray.indexOf("signin") == -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  isCredentialPage(path) {
    let pathArray = path.split("/");

    //check if user is going to credential page
    if (
      (pathArray.indexOf("signup") !== -1 ||
        pathArray.indexOf("signin") !== -1) &&
      pathArray.length == 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default new Auth();
