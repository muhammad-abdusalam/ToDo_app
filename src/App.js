import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);
  const errorMsg = "Request is not authorized!";

  const todo_user = JSON.parse(localStorage.getItem("todo-user"));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("todo-user")));
    getTasks();
  }, []);

  const getTasks = () => {
    if (todo_user) {
      Axios.get(`${serverUrl}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${todo_user.token}`,
        },
      })
        .then((response) => {
          setLoading(false);
          setTasks(response.data);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.data.error === errorMsg) {
            localStorage.removeItem("todo-user");
            setUser(null);
          }
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <HashRouter>
      <div className="App">
        {!loading ? (
          <>
            <Header user={user} setUser={setUser} />
            <div className="pages container">
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? (
                      <Home
                        user={user}
                        setUser={setUser}
                        getTasks={getTasks}
                        setTasks={setTasks}
                        tasks={tasks}
                      />
                    ) : (
                      <Navigate to={"/signup"} />
                    )
                  }
                />
                <Route
                  path="/signup"
                  element={
                    !user ? <Signup setUser={setUser} /> : <Navigate to={"/"} />
                  }
                />
                <Route
                  path="/login"
                  element={
                    !user ? <Login setUser={setUser} /> : <Navigate to={"/"} />
                  }
                />
              </Routes>
            </div>
            <Footer />
          </>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    </HashRouter>
  );
}

export const serverUrl = process.env.REACT_APP_SERVER_URL;
export default App;
