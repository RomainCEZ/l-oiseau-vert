import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "../../core/models/Post";
import { PostsService } from "../services/posts.service";

@Injectable()
export class PostsResolver implements Resolve<Post[]> {
    constructor(private postsService: PostsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Post[] | Observable<Post[]> | Promise<Post[]> {
        return this.postsService.getPosts()
    }
}