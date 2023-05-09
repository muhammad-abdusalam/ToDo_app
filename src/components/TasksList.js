import Axios from "axios";
import { serverUrl } from "../App";

const TaksList = (props) => {
  // Handle edit
  const showEditDiv = (id, title) => {
    const editDiv = document.querySelector(".edit-task-form");
    editDiv.classList.remove("hidden");
    props.setTaskId(id);
    props.setTaskTitle(title);
  };
  const editStatus = (task, element) => {
    if (task.status === "active") {
      element.target.parentElement.classList.add("completed");
    } else {
      element.target.parentElement.classList.remove("completed");
    }
    Axios.patch(`${serverUrl}/api/tasks/${task._id}`, {
      status: task.status === "active" ? "completed" : "active",
    })
      .then(() => {
        props.getTasks();
      })
      .catch((err) => console.log(err));
  };

  // Handle delete
  const deleteTask = async (id) => {
    await Axios.delete(`${serverUrl}/api/tasks/${id}`);
    const remainTasks = props.tasks.filter((task) => {
      return task._id !== id;
    });
    props.setTasks(remainTasks);
  };
  return (
    <div className="tasks-list-container">
      <div className="tasks-list">
        <h2>All Tasks</h2>
        {props.tasks.length > 0 ? (
          props.tasks.map((task) => {
            return (
              <div className={`task ${task.status}`} key={task._id}>
                <h3 className="task-title" onClick={(e) => editStatus(task, e)}>
                  {task.title}
                </h3>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
                <button
                  className="edit-btn"
                  onClick={() => showEditDiv(task._id, task.title)}
                >
                  Edit
                </button>
              </div>
            );
          })
        ) : (
          <p>No tasks, add your first task for the day</p>
        )}
      </div>
    </div>
  );
};

export default TaksList;
