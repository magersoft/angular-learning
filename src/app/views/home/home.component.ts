import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {Todo, TodosService} from './todos.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ModalComponent} from '../../modal/modal.component';
import {RefDirective} from '../../directives/ref.directive';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(RefDirective, { static: false }) refDir: RefDirective;

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

  constructor(
    private todoService: TodosService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Home Page | Angular');
    meta.addTags([
      { name: 'keywords', content: 'angular, google' },
      { name: 'description', content: 'this is angular' }
    ]);
  }

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

  showModal() {
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
    this.refDir.containerRef.clear();
    const component = this.refDir.containerRef.createComponent(modalFactory);

    component.instance.title = 'Dynamic title';
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }
}
