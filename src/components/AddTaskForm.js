import Axios from "axios";
import { useState } from "react";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

const AddTaskForm = (props) => {
  const [title, setTitle] = useState("");
  const errorMsg = "Request is not authorized!";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTask = () => {
    if (title.trim() !== "") {
      Axios.post(
        `${serverUrl}/api/tasks`,
        {
          title: title.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      )
        .then((response) => {
          setTitle("");
          props.setTasks([...props.tasks, response.data]);
        })
        .catch((error) => {
          if (error.response.data.error === errorMsg) {
            localStorage.removeItem("todo-user");
            navigate("/login");
          }
        });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <label htmlFor="task-name">Add new task</label>
      <div>
        <input
          id="task-name"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button onClick={addTask}>Add</button>
      </div>
    </form>
  );
};

export default AddTaskForm;
