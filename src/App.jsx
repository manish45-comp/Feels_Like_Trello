import "./App.css";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <div className="my-5 p-2 ps-16">
          <p className="text-4xl font-bold">Feels Like Trello</p>
          <p className="my-2 text-zinc-700">
            Say goodbye to sticky notes and to-do lists: Trello allows teams of
            any size to easily <br /> manage tasks and hit deadlines.
          </p>
        </div>
        <div className="p-2">
          <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;
