import Header from "./components/Header";
import Footer from "./components/Footer";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TaksList from "./components/TasksList";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";

export const serverUrl = process.env.REACT_APP_SERVER_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    Axios.get(`${serverUrl}/api/tasks`).then((response) => {
      setTasks(response.data);
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <AddTaskForm getTasks={getTasks} />
        <TaksList
          tasks={tasks}
          setTasks={setTasks}
          setTaskId={setTaskId}
          setTaskTitle={setTaskTitle}
          getTasks={getTasks}
        />
        <EditTaskForm
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          taskId={taskId}
          getTasks={getTasks}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
