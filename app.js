require("colors");
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksToDelete,
  confirmation,
  showCheckList,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Todos = require("./models/todos");

console.clear();

const main = async () => {
  let opt = "";
  const todos = new Todos();

  const todosDB = readDB();

  if (todosDB) {
    todos.loadDataFromArray(todosDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await readInput("Description: ");
        todos.createTodo(desc);
        break;

      case "2":
        todos.completedList();
        break;

      case "3":
        todos.listCompleted(true);
        break;

      case "4":
        todos.listCompleted(false);
        break;

      case "5":
        const ids = await showCheckList(todos.listArr);
        todos.toggleCompleted(ids);
        break;

      case "6":
        const id = await listTasksToDelete(todos.listArr);
        if (id !== "0") {
          const ok = await confirmation("¿Estás seguro?");

          if (ok) {
            todos.deleteTask(id);
            console.log("Tarea borrada");
          }
        }

        break;
    }

    saveDB(todos.listArr);
    await pause();
  } while (opt !== "0");
};

main();
