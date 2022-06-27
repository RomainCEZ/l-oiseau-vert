import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../core/models/Post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {

  constructor(
    private postsService: PostsService,
  ) { }

  loading$!: Observable<boolean>
  posts$!: Observable<Post[]>

  ngOnInit(): void {
    this.initObservables()
    this.postsService.getNextTenPosts()
  }

  private initObservables() {
    this.loading$ = this.postsService.loading$
    this.posts$ = this.postsService.posts$
  }
  getNextPosts() {
    this.postsService.getNextTenPosts()
  }

  onScrollDown(e: any) {
    this.getNextPosts()
  }

}
