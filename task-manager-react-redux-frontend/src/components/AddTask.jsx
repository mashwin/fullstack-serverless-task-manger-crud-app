import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../actions/tasksActions";

export const AddTask = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, id: uuidv4(), isCompleted: false };
      await dispatch(addTask(payload));
      reset();
      toast.success("Task added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4">
          <div className="mt-3">
            <label htmlFor="title" className="form-label">
              Add Task
            </label>
            <input
              type="text"
              className="form-control"
              {...register("title", {
                required: true,
              })}
            />
            {errors && errors.title && (
              <p className="text-danger">Title is required</p>
            )}
          </div>
          <div className="mt-3 mb-3 d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={handleReset}>
              Reset
            </button>
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};
