import { Link } from "react-router-dom";

const Header = (props) => {
  const logout = () => {
    localStorage.removeItem("todo-user");
    props.setUser(null);
  };

  return (
    <header>
      <Link to="/">
        <h1>ToDo List</h1>
      </Link>
      <nav>
        {!props.user ? (
          <ul>
            <li>
              <Link to={"/login"}>Log in</Link>
            </li>
            <li>
              <Link to={"/signup"} className="signup">
                Sign up
              </Link>
            </li>
          </ul>
        ) : (
          <>
            <span className="user-name">{props.user.name}</span>
            <button className="logout" onClick={logout}>
              Log out
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
