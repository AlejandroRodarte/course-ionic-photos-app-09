import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../interfaces/post';
import { GetPostsResponse } from '../../../interfaces/get-posts-response';
import { tap } from 'rxjs/operators';
import { PageTracker } from '../../../interfaces/page-tracker';
import { Observable } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false })
  private infiniteScroll: IonInfiniteScroll;

  public posts: Post[] = [];

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.loadPosts().subscribe();
  }

  loadMorePosts(event: any): void {

    this.
      loadPosts()
      .pipe(
        tap(() => {

          event.target.complete();

          if (this.postsService.pageTracker.lastPage) {
            event.target.disabled = true;
          }

        })
      )
      .subscribe();

  }

  refreshPosts(event: any): void {

    this.postsService.resetTracker();

    this
      .loadPosts(false)
      .pipe(
        tap(() => {
          event.target.complete();
          this.infiniteScroll.disabled = false;
        })
      )
      .subscribe();

  }

  private loadPosts(append: boolean = true): Observable<GetPostsResponse> {

    return this
            .postsService
            .getPosts()
            .pipe(
              tap(
                (response: GetPostsResponse) => append ? this.posts.push(...response.posts) : this.posts = response.posts
              )
            );

  }

}
