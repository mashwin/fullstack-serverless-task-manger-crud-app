import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Header } from "./components/Header";
import { ListTasks } from "./components/ListTasks";
import { AddTask } from "./components/AddTask";
import { Loader } from "./components/Loader";

function App() {
  const loaderSelector = useSelector((state) => state.tasks.loader);

  return (
    <>
      <Toaster position="top-right" />
      <Header />
      <AddTask />
      {loaderSelector && <Loader />}
      <ListTasks />
    </>
  );
}

export default App;
