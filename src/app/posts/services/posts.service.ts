import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../../core/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private _loading$ = new BehaviorSubject<boolean>(false)
  get loading$() {
    return this._loading$.asObservable()
  }

  private _posts$ = new BehaviorSubject<Post[]>([]);
  get posts$(): Observable<Post[]> {
    return this._posts$.asObservable();
  }

  oldestPost!: Post
  oldestPostDate: number = Date.now()
  posts!: Post[]

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading)
  }

  public getPosts(): void {
    this.setLoadingStatus(true)
    this.http.get<Post[]>(`${environment.apiUrl}posts`).pipe(
      tap(posts => {
        this.oldestPost = posts[posts.length - 1]
        this._posts$.next(posts)
        this.setLoadingStatus(false)
      })
    ).subscribe()
  }

  public getNextTenPosts() {
    this.setLoadingStatus(!true)
    this.http.get<Post[]>(`${environment.apiUrl}posts/next/${this.oldestPostDate}`).pipe(
      tap(posts => {
        posts.length ? this.oldestPostDate = posts[posts.length - 1].creationDate : posts
        this._posts$.next(this._posts$.getValue().concat(posts))
        this.setLoadingStatus(!false)
      })
    ).subscribe()
  }

  public sendPost(post: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}posts`, post)
  }
}
