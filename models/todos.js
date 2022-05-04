const Todo = require("./todo");

class Todos {
  _listtodo = {};

  get listArr() {
    const list = [];
    Object.keys(this._listtodo).forEach((key) => {
      const todo = this._listtodo[key];
      list.push(todo);
    });
    return list;
  }

  constructor() {
    this._listtodo = {};
  }

  deleteTask(id = "") {
    if (this._listtodo[id]) {
      delete this._listtodo[id];
    }
  }

  loadDataFromArray(todos = []) {
    todos.forEach((todo) => (this._listtodo[todo.id] = todo));
  }

  createTodo(desc = "") {
    const todo = new Todo(desc);
    this._listtodo[todo.id] = todo;
  }

  completedList() {
    this.listArr.forEach((task, i) => {
      console.log();
      const idx = `${i + 1}`.green;
      const { desc, completedAt } = task;
      const state = completedAt ? "Completada".green : "Pendiente".red;
      console.log(`${idx}. ${desc} :: ${state}`);
    });
  }

  listCompleted(completed = true) {
    let counter = 0;
    this.listArr.forEach((task) => {
      console.log();
      const { desc, completedAt } = task;
      const state = completedAt ? "Completada".green : "Pendiente".red;
      if (completed) {
        if (completedAt) {
          counter++;
          console.log(
            `${(counter + ".").green} ${desc} :: ${completedAt.green}`
          );
        }
      } else {
        if (!completedAt) {
          counter++;
          console.log(`${(counter + ".").green} ${desc} :: ${state}`);
        }
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._listtodo[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._listtodo[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Todos;
