import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

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

  ngOnInit(): void {
  }

  updatePosts(post: Post) {
    this.posts.unshift(post);
  }

  removePost(id: number) {
    this.posts = this.posts.filter(p => p.id !== id);
  }
}
