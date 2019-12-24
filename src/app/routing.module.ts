import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {PostsComponent} from './views/posts/posts.component';
import {PostComponent} from './views/post/post.component';
import {ErrorPageComponent} from './views/error-page/error-page.component';
import {AuthGuard} from './auth.guard';
import {PostResolver} from './views/post/post.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostComponent, resolve: { post: PostResolver } },
  { path: 'error', component: ErrorPageComponent },
  { path: 'about', loadChildren: () => import('./views/about/about.module').then(module => module.AboutModule) },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class RoutingModule {}
