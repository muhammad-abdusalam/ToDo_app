import Axios from "axios";
import { useState } from "react";
import { serverUrl } from "../App";

const AddTaskForm = (props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTask = () => {
    if (title.trim() !== "") {
      Axios.post(`${serverUrl}/api/tasks`, {
        title: title.trim(),
      })
        .then(() => {
          setTitle("");
          props.getTasks();
        })
        .catch((err) => console.log(err));
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
