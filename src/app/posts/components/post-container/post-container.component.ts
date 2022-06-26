import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../core/models/Post';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {

  constructor(private postsService: PostsService) { }

  posts$!: Observable<Post[]>

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts()
  }

}
