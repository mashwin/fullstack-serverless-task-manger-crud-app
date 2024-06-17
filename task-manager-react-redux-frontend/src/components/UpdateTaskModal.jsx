import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTask } from "../actions/tasksActions";

export const UpdateTaskModal = ({ show, onClose, task }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("isCompleted", task.isCompleted.toString());
    }
  }, [task, setValue]);

  const onSubmit = (data) => {
    try {
      const updatedTask = {
        ...task,
        ...data,
        isCompleted: data.isCompleted === "true",
      };

      dispatch(updateTask(updatedTask));
      onClose();
      toast.success("Task updated sucessfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // watch the value of isCompleted flag
  const isCompletedValue = watch("isCompleted");

  if (!show) {
    return null;
  }

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <p className="text-danger">Title is required</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Is Completed</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="completedTrue"
                      value="true"
                      {...register("isCompleted")}
                      checked={isCompletedValue === "true"}
                    />
                    <label className="form-check-label" htmlFor="completedTrue">
                      True
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="completedFalse"
                      value="false"
                      {...register("isCompleted")}
                      checked={isCompletedValue === "false"}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="completedFalse"
                    >
                      False
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
