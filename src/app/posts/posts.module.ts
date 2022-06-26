import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostContainerComponent } from './components/post-container/post-container.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';



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
  ]
})
export class PostsModule { }
