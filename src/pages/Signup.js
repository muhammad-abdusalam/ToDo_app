import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await signup(name, username, password);
    props.setUser(user);
    setLoading(false);
  };

  return (
    <div className="signup">
      {!loading ? (
        <>
          <h2>Sign Up</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Sign up</button>
            {error && <p className="error">{error}</p>}
          </form>
          <Link to={"/login"}>Already have an account?</Link>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default Signup;
