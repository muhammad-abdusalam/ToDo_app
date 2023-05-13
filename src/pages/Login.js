import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    props.setUser(user);
  };

  return (
    <div className="Login">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;