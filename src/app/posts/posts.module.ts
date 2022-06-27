import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostContainerComponent } from './components/post-container/post-container.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PostsService } from './services/posts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../core/pipes/TimeAgoPipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostSkeletonComponent } from './components/post-skeleton/post-skeleton.component';



@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    PostSkeletonComponent,
    PostContainerComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  exports: [
    HomeComponent,
    PostContainerComponent,
    TimeAgoPipe
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
