import { Component, OnInit } from '@angular/core';
import { Todo } from "../../models/Todo"

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  LOCAL_STORAGE_KEY: string = "todos";
  todos: Todo[]
  inputTodo: string = "";
  constructor() { }

  ngOnInit(): void {
    const storageTodos = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
    if (storageTodos) {
      this.todos = storageTodos;
    } else {
      this.todos = []
      localStorage.setItem(this.LOCAL_STORAGE_KEY, "[]")
    }
  }

  reset() {
    const storageTodos = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
    if (this.todos.length != 0 && storageTodos.length != 0) {
      this.todos = []
      localStorage.setItem(this.LOCAL_STORAGE_KEY, "[]")
    } else {
      alert("No ToDo's to reset!")
    }
  }

  toggleDone(id: number) {
    this.todos.map((v, i) => {
      /* istanbul ignore else */
      if (i == id) v.completed = !v.completed;

      return v;
    })
    const storageTodos = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
    const updStorageTodos = storageTodos.map((v, i) => {
      /* istanbul ignore else */
      if (i == id) v.completed = !v.completed;

      return v;
    });
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(updStorageTodos))
  }

  deleteTodo(id: number) {
    const storageTodos = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
    this.todos = this.todos.filter((v, i) => i !== id);
    const remStorageTodos = storageTodos.filter((v, i) => i !== id);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(remStorageTodos))
  }

  addTodo() {
    if (this.inputTodo) {
      const newToDo = {
        content: this.inputTodo,
        completed: false
      }
      this.todos.push(newToDo);
      this.inputTodo = "";
      const storageTodos = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify([...storageTodos, newToDo]))
    } else {
      alert("Error; Add ToDo!")
    }
  }

}
