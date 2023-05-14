import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import TaksList from "../components/TasksList";
import AddTaskForm from "../components/AddTaskForm";
import EditTaskForm from "../components/EditTaskForm";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [tasks, setTasks] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const errorMsg = "Request is not authorized!";
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    Axios.get(`${serverUrl}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${props.user.token}`,
      },
    })
      .then((response) => {
        setTasks(response.data);
        console.log("finish");
      })
      .catch((error) => {
        if (error.response.data.error === errorMsg) {
          localStorage.removeItem("todo-user");
          props.setUser(null);
          navigate("/login");
        }
      });
  };

  return (
    <div className="home">
      <AddTaskForm
        user={props.user}
        setUser={props.setUser}
        getTasks={getTasks}
        tasks={tasks}
        setTasks={setTasks}
      />
      <TaksList
        user={props.user}
        setUser={props.setUser}
        tasks={tasks}
        setTasks={setTasks}
        setTaskId={setTaskId}
        setTaskTitle={setTaskTitle}
        getTasks={getTasks}
      />
      <EditTaskForm
        user={props.user}
        setUser={props.setUser}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskId={taskId}
        getTasks={getTasks}
      />
    </div>
  );
};

export default Home;
