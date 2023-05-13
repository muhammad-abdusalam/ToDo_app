import Axios from "axios";
import { serverUrl } from "../App";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setError(null);
    try {
      const response = await Axios.post(`${serverUrl}/api/users/login`, {
        user_name: username,
        password,
      });
      localStorage.setItem("todo-user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return { login, error };
};
