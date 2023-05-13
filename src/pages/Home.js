import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import TaksList from "../components/TasksList";
import AddTaskForm from "../components/AddTaskForm";
import EditTaskForm from "../components/EditTaskForm";
import { serverUrl } from "../App";

const Home = (props) => {
  const [tasks, setTasks] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    Axios.get(`${serverUrl}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${props.user.token}`,
      },
    }).then((response) => {
      setTasks(response.data);
    });
  };

  return (
    <div className="home">
      <AddTaskForm
        user={props.user}
        getTasks={getTasks}
        tasks={tasks}
        setTasks={setTasks}
      />
      <TaksList
        user={props.user}
        tasks={tasks}
        setTasks={setTasks}
        setTaskId={setTaskId}
        setTaskTitle={setTaskTitle}
        getTasks={getTasks}
      />
      <EditTaskForm
        user={props.user}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskId={taskId}
        getTasks={getTasks}
      />
    </div>
  );
};

export default Home;
