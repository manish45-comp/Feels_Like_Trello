import { shallow } from "zustand/shallow";
import { useStore } from "../store/store";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import IconClose from "./IconClose";
import IconTask from "./IconTask";

const Column = ({ status }) => {
  const { addTask, removeTask, setDragTask, moveTask } = useStore();
  const draggedTask = useStore((store) => store.draggedTask);

  const tasks = useStore(
    (state) => state.tasks.filter((task) => task.status === status),
    shallow
  );

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [drop, setDrop] = useState(false);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const getBgColor = (t) => {
    switch (t) {
      case "todo":
        return "bg-red-300";
      case "ongoing":
        return "bg-yellow-300";
      case "completed":
        return "bg-green-300";
      default:
        return "";
    }
  };

  const getTextColor = (t) => {
    switch (t) {
      case "todo":
        return "text-red-700";
      case "ongoing":
        return "text-yellow-700";
      case "completed":
        return "text-green-700";
      default:
        return "";
    }
  };

  return (
    <>
      <div
        className={`${getBgColor(status)} ${
          drop
            ? "border-2 border-dashed border-purple-800"
            : "border-2 border-transparent"
        }  w-96 rounded-md p-1 flex flex-col`}
        onDragOver={(e) => {
          setDrop(true);
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          setDrop(false);
          e.preventDefault();
        }}
        onDrop={() => {
          setDrop(false);
          moveTask(draggedTask, status);
          setDragTask(null);
        }}
      >
        <p
          className={`${getTextColor(
            status
          )} text-3xl font-bold rounded-md p-1 text-center mb-5`}
        >
          {status.replace(status.charAt(0), status.charAt(0).toUpperCase())}
        </p>
        <div className="flex-1">
          {tasks.map((task) => (
            <div
              draggable
              onDragStart={() => setDragTask(task.id)}
              key={task.title}
              className="cursor-move bg-zinc-100 border-4 shadow-lg border-s-blue-600 mb-2 p-2 rounded-md flex gap-1 items-start justify-between"
            >
              <div className="flex-1">
                <p className="text-black">{task.title}</p>
              </div>

              <div
                className={`${getBgColor(
                  task.status
                )} rounded-md px-1 flex items-center justify-center`}
              >
                <span
                  className={`${getTextColor(status)} text-sm font-semibold`}
                >
                  {task.status}
                </span>
              </div>

              <button onClick={() => removeTask(task.id)}>
                <IconClose />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          className="w-full my-2 border border-dashed border-blue-800 text-zinc-800 font-semibold hover:bg-blue-300 py-1 px-2 rounded-md"
        >
          Add Task
        </button>
      </div>

      {open && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-[rgba(0,0,0,0.7)] h-screen w-screen ">
          <div className="absolute flex gap-2 flex-col justify-around z-10 bg-zinc-100 p-4 h-min w-96 rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] right-0 bottom-0">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-2">
                <IconTask />
                <p className="text-zinc-700 font-bold">Add New task</p>
              </div>
              <button onClick={() => setOpen(false)}>
                <IconClose />
              </button>
            </div>
            <input
              name="title"
              value={title}
              onChange={handleChange}
              type="text"
              placeholder="Enter task title"
              className="p-2 border border-blue-200 bg-white text-black rounded-md w-full"
            />
            <button
              onClick={() => {
                if (title === "") alert("Please enter a title");
                if (title.length > 0 && title != "") {
                  addTask({ id: uuid(), title, status });
                  setOpen(false);
                  setTitle("");
                }
              }}
              className="w-full mt-2 border border-dashed border-blue-800 text-zinc-900 font-semibold hover:bg-blue-300 py-1 px-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Column;
