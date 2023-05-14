import Axios from "axios";
import { serverUrl } from "../App";
import trash from "./trash.svg";
import edit from "./edit.svg";
import done from "./done.svg";
import { useNavigate } from "react-router-dom";

const TaksList = (props) => {
  const errorMsg = "Request is not authorized!";
  const navigate = useNavigate();

  // Handle edit
  const showEditDiv = (id, title) => {
    const editDiv = document.querySelector(".edit-task-form");
    editDiv.classList.remove("hidden");
    props.setTaskId(id);
    props.setTaskTitle(title);
  };
  const editStatus = (task, element) => {
    if (element.parentElement.classList.contains("active")) {
      element.parentElement.classList.add("completed");
      element.parentElement.classList.remove("active");
    } else {
      element.parentElement.classList.remove("completed");
      element.parentElement.classList.add("active");
    }
    Axios.patch(
      `${serverUrl}/api/tasks/${task._id}`,
      {
        status: task.status === "active" ? "completed" : "active",
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
  };
  // Handle delete
  const deleteTask = async (id) => {
    const remainTasks = props.tasks.filter((task) => {
      return task._id !== id;
    });
    props.setTasks(remainTasks);

    try {
      await Axios.delete(`${serverUrl}/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
    } catch (error) {
      if (error.response.data.error === errorMsg) {
        localStorage.removeItem("todo-user");
        props.setUser(null);
        navigate("/login");
      }
    }
  };

  return (
    <div className="tasks-list-container">
      <div className="tasks-list">
        <h3>All Tasks</h3>
        {!props.tasks ? (
          <p>Loading...</p>
        ) : props.tasks.length > 0 ? (
          props.tasks.map((task) => {
            return (
              <div className={`task ${task.status}`} key={task._id}>
                <h3 className="task-title">{task.title}</h3>
                <button
                  className="delete-btn"
                  onClick={(e) => deleteTask(task._id, e.currentTarget)}
                >
                  <img src={trash} alt="" />
                </button>
                <button
                  className="edit-btn"
                  onClick={() => showEditDiv(task._id, task.title)}
                >
                  <img src={edit} alt="" />
                </button>
                <button
                  className="done-btn"
                  onClick={(e) => editStatus(task, e.currentTarget)}
                >
                  <img src={done} alt="" />
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
