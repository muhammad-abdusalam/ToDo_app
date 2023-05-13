import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("todo-user")));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <div className="pages container">
          <Routes>
            <Route
              path="/"
              element={user ? <Home user={user} /> : <Navigate to={"/login"} />}
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
      </div>
    </BrowserRouter>
  );
}

export const serverUrl = process.env.REACT_APP_SERVER_URL;
export default App;
