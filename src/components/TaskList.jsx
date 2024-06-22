import Column from "./Column";

const TaskList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start place-items-center justify-center gap-2">
      <Column status="todo" />
      <Column status="ongoing" />
      <Column status="completed" />
    </div>
  );
};

export default TaskList;
