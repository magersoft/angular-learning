import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo, TodosService} from './todos.service';

export interface Post {
  title: string;
  text: string;
  id?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  search = '';

  searchField = 'title';

  posts: Post[] = [
    { title: 'I want learning Angular Components', text: 'Text text text', id: 1 },
    { title: 'Next block post', text: 'Text text text again text', id: 2 },
  ];

  todos: Todo[] = [];

  todoTitle = '';

  loading = false;

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

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  updatePosts(post: Post) {
    this.posts.unshift(post);
  }

  removePost(id: number) {
    this.posts = this.posts.filter(p => p.id !== id);
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
}
