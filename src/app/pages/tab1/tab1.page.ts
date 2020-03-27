import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../interfaces/post';
import { GetPostsResponse } from '../../../interfaces/get-posts-response';
import { tap } from 'rxjs/operators';
import { PageTracker } from '../../../interfaces/page-tracker';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public posts: Post[] = [];
  public pageTracker: PageTracker;

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {

    this.pageTracker = this.postsService.pageTracker;

    this
      .postsService
      .getPosts()
      .pipe(
        tap(
          (response: GetPostsResponse) => {
            this.posts = response.posts;
            console.log(this.posts);
          }
        )
      )
      .subscribe();

  }

}
