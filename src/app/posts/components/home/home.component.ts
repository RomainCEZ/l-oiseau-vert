import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private formBuilder: FormBuilder
  ) { }
  username$!: Observable<string>
  username!: string
  newPostForm!: FormGroup;

  ngOnInit(): void {
    this.username$ = this.authService.userSession$.pipe(
      map(userSession => userSession!.username),
      tap(username => this.username = username)
    )
    this.newPostForm = this.formBuilder.group({
      content: ['', Validators.required]
    })
  }


  onPostContent() {
    if (!this.newPostForm.valid) return
    this.postsService.sendPost(this.newPostForm.value).subscribe(
      () => this.postsService.getPosts()
    )
    this.newPostForm.reset()
  }

}
