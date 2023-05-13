import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signup(name, username, password);
    props.setUser(user);
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
        <button>Sign up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
