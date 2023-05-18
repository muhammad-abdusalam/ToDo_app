import { useState } from "react";
import TaksList from "../components/TasksList";
import AddTaskForm from "../components/AddTaskForm";
import EditTaskForm from "../components/EditTaskForm";

const Home = (props) => {
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  return (
    <div className="home">
      <AddTaskForm
        user={props.user}
        setUser={props.setUser}
        getTasks={props.getTasks}
        tasks={props.tasks}
        setTasks={props.setTasks}
      />
      <TaksList
        user={props.user}
        setUser={props.setUser}
        tasks={props.tasks}
        setTasks={props.setTasks}
        setTaskId={setTaskId}
        setTaskTitle={setTaskTitle}
        getTasks={props.getTasks}
      />
      <EditTaskForm
        user={props.user}
        setUser={props.setUser}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskId={taskId}
        getTasks={props.getTasks}
      />
    </div>
  );
};

export default Home;
