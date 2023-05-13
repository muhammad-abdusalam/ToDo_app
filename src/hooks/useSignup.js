import Axios from "axios";
import { serverUrl } from "../App";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = async (name, username, password) => {
    setError(null);
    try {
      const response = await Axios.post(`${serverUrl}/api/users/signup`, {
        name,
        user_name: username,
        password,
      });
      localStorage.setItem("todo-user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return { signup, error };
};
