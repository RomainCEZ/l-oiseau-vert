import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostContainerComponent } from './components/post-container/post-container.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PostsService } from './services/posts.service';
import { PostsResolver } from './resolvers/posts.resolver';



@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    PostContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    PostContainerComponent
  ],
  providers: [
    PostsService,
    PostsResolver
  ]
})
export class PostsModule { }
