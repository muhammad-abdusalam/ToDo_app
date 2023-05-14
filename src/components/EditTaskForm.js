import Axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

const EditTaskForm = (props) => {
  const errorMsg = "Request is not authorized!";
  const navigate = useNavigate();

  const editTaskTitle = (id) => {
    if (props.taskTitle.trim() !== "") {
      const editDiv = document.querySelector(".edit-task-form");
      editDiv.classList.add("hidden");

      Axios.patch(
        `${serverUrl}/api/tasks/${id}`,
        {
          title: props.taskTitle.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      )
        .then(() => {
          props.getTasks();
        })
        .catch((error) => {
          if (error.response.data.error === errorMsg) {
            localStorage.removeItem("todo-user");
            props.setUser(null);
            navigate("/login");
          }
        });
    }
  };

  return (
    <div className="edit-task-form hidden">
      <label htmlFor="task-name">Edit task</label>
      <input
        id="task-name"
        type="text"
        onChange={(e) => props.setTaskTitle(e.target.value)}
        value={props.taskTitle}
      />
      <div>
        <button className="ok" onClick={() => editTaskTitle(props.taskId)}>
          Ok
        </button>
        <button
          className="cancel"
          onClick={() => {
            const editDiv = document.querySelector(".edit-task-form");
            editDiv.classList.add("hidden");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTaskForm;
