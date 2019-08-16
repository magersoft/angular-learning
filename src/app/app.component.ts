import { Component } from '@angular/core';

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
export class AppComponent {
  posts: Post[] = [
    { title: 'I want learning Angular Components', text: 'Text text text', id: 1 },
    { title: 'Next block post', text: 'Text text text again text', id: 2 },
  ];

  updatePosts(post: Post) {
    this.posts.unshift(post);
  }
}
