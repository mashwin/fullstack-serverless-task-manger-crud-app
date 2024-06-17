import {
  ADD_TASK_FAILURE,
  ADD_TASK_STARTED,
  ADD_TASK_SUCCESS,
  GET_TASKS_STARTED,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
  DELETE_TASK_STARTED,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  UPDATE_TASK_STARTED,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
} from "../constants";

const initialState = {
  tasksList: [],
  loader: false,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_STARTED:
      return {
        ...state,
        loader: true,
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasksList: action.payload,
        loader: false,
      };
    case GET_TASKS_FAILURE:
      return {
        ...state,
        loader: false,
      };
    case ADD_TASK_STARTED:
      return {
        ...state,
        loader: true,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasksList: [...state.tasksList, action.payload],
        loader: false,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        loader: false,
      };
    case DELETE_TASK_STARTED:
      return {
        ...state,
        loader: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasksList: state.tasksList.filter((task) => task.id != action.payload),
        loader: false,
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loader: false,
      };
    case UPDATE_TASK_STARTED:
      return {
        ...state,
        loader: true,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasksList: state.tasksList.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          } else {
            return task;
          }
        }),
        loader: false,
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
