import {Component, OnInit} from '@angular/core';
import {Todo, TodosService} from './todos.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search = '';
  searchField = 'title';

  todos: Todo[] = [];
  todoTitle = '';
  loading = false;
  error = '';

  promise: Promise<string> = new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('Promise resolve');
    }, 4000);
  });

  date: Observable<Date> = new Observable(obs => {
    setInterval(() => {
      obs.next(new Date());
    }, 1000);
  });

  constructor(private todoService: TodosService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }
    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo)
      .subscribe(todo => {
        this.todos.push(todo);
        this.todoTitle = '';
      });
  }

  fetchTodos() {
    this.loading = true;
    this.todoService.fetchTodos()
      .subscribe(todos => {
        this.todos = todos;
        this.loading = false;
      }, error => {
        this.error = error.message;
      });
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });
  }

  competedTodo(id: number) {
    this.todoService.completedTodo(id)
      .subscribe(todo => {
        this.todos.find(t => t.id === todo.id).completed = true;
      });
  }

  goToPostsPage() {
    this.router.navigate(['/posts']);
  }
}
