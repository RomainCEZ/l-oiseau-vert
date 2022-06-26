import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../core/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  posts: Post[] = []

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/api/posts')
  }
}
