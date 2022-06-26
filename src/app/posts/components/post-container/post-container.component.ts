import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../../core/models/Post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  posts$!: Observable<Post[]>

  ngOnInit(): void {
    this.posts$ = this.router.data.pipe(
      map(data => data['posts'])
    )
  }

}
