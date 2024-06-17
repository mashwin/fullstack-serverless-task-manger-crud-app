import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../actions";
import { UpdateTaskModal } from "./UpdateTaskModal";

export const ListTasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getTasksList();
  }, []);

  const getTasksList = () => {
    dispatch(getTasks());
  };

  const handleDeleteTask = (task) => {
    try {
      dispatch(deleteTask(task.id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setShowUpdateTaskModal(true);
  };

  const onClose = () => {
    setShowUpdateTaskModal(false);
  };

  const tasksListSelector = useSelector((state) => state.tasks.tasksList);

  return (
    <>
      <div className="p-4">
        <ul className="list-group list-group-flush">
          {tasksListSelector &&
            tasksListSelector.map((task) => (
              <li
                key={task.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  task.isCompleted ? "completed-task" : ""
                }`}
              >
                {task.title || "Untitled Task"}
                <div>
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => handleUpdate(task)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteTask(task)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
        {showUpdateTaskModal && (
          <UpdateTaskModal
            show={showUpdateTaskModal}
            onClose={onClose}
            task={selectedTask}
          />
        )}
      </div>
    </>
  );
};
