import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap, Observable, switchMap, map, timeInterval } from 'rxjs';
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
    private authService: AuthService, private formBuilder: FormBuilder) { }

  post$!: Observable<Post>
  userId$!: Observable<string>
  editing: boolean = false
  content!: string
  editPostForm!: FormGroup

  ngOnInit(): void {
    this.initObservables()
  }

  private initObservables(): void {
    this.getPostById()
    this.userId$ = this.authService.userSession$.pipe(
      map(userSession => userSession.userId)
    )
  }

  initForm() {
    this.editPostForm = this.formBuilder.group({ content: [this.content, Validators.required] })
  }

  private getPostById() {
    this.post$ = this.route.params.pipe(
      switchMap(params => this.postsService.getPostById(params['id']))
    )
  }

  editPost() {
    this.post$.subscribe(
      post => {
        this.content = post.content
        this.initForm()
        this.editing = true
      }
    )
  }

  cancelEdit() {
    this.editing = false
  }

  onEditPost() {
    if (this.content !== this.editPostForm.value.content) {
      this.post$.subscribe(
        post => {
          this.postsService.editPostById(post.id, this.editPostForm.value)
          this.getPostById()
        })
    }
    this.editing = false
  }

  deletePost(id: string) {
    this.postsService.deletePostById(id)
  }
}
