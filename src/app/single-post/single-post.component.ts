import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Post } from '../core/models/Post';
import { PostsService } from '../posts/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService) { }

  post$!: Observable<Post>
  userId$!: Observable<string>

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap(params => this.postsService.getPostById(params['id']))
    )
    this.userId$ = this.authService.userSession$.pipe(
      map(userSession => userSession.id)
    )
  }

}
