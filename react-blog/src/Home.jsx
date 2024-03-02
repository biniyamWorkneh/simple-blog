import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  TrashFill,
  CircleFill,
  CheckCircleFill,
  Trash2,
} from "react-bootstrap-icons";

const Home = () => {
  const [todo, setTodo] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTodo(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id, task) => {
    setEditingTaskId(id);
    setEditedTaskText(task);
  };

  const handleSave = (id) => {
    axios
      .patch(`http://localhost:5000/update/${id}`, { task: editedTaskText })
      .then(() => {
        setEditingTaskId(null);
        setEditedTaskText("");
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todo.length === 0 ? (
        <div>
          <h2>no records</h2>
        </div>
      ) : (
        todo.map((task) => (
          <div className="task" key={task._id}>
            {editingTaskId === task._id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                />
                <button onClick={() => handleSave(task._id)}>Save</button>
              </div>
            ) : (
              <div
                className="checkbox"
                onClick={() => handleEdit(task._id, task.task)}
              >
                {task.done ? (
                  <CheckCircleFill className="icon" />
                ) : (
                  <CircleFill className="icon" />
                )}
                <p className={task.done ? "line_through" : ""}>{task.task}</p>
              </div>
            )}
            <div className="icon">
              <span>
                <TrashFill onClick={() => handleDelete(task._id)} />
              </span>
              <span>
                <Trash2 onClick={() => handleEdit(task._id, task.task)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
