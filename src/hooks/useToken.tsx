import { useState, useEffect } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token") || "";

    return tokenString;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expire");
    setToken("");
  };

  useEffect(() => {
    const expiredDateString = localStorage.getItem("expire");

    if (token && expiredDateString) {
      const expiredDate = Date.parse(JSON.parse(expiredDateString));

      const nowDate = Date.now();

      if (expiredDate < nowDate) {
        localStorage.removeItem("token");
        localStorage.removeItem("expire");
        setToken("");
      }
    }
  }, [token]);

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
