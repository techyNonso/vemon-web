import axiosInstance from "Modules/axiosInstance";

export default function logout() {
  if (
    !localStorage.getItem("refresh_token") ||
    localStorage.getItem("refresh_token") == ""
  ) {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("IsVemonOnline", false);
    window.location = "/";
  } else {
    const data = {
      refresh: localStorage.getItem("refresh_token"),
    };
    axiosInstance
      .post(`http://127.0.0.1:8000/logout/`, data)
      .then((res) => {
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
        localStorage.setItem("IsVemonOnline", false);
        window.location = "/";
      })
      .catch((err) => console.log(err));
  }
}
