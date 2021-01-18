class Auth {
  login() {
    localStorage.setItem("IsVemonOnline", true);
  }
  isAuthenticated() {
    return localStorage.getItem("IsVemonOnline") ? true : false;
  }
}

export default new Auth();
