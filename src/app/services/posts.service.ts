import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetPostsResponse } from 'src/interfaces/get-posts-response';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { PageTracker } from 'src/interfaces/page-tracker';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public pageTracker: PageTracker = {
    page: 1,
    lastPage: false
  };

  private updatePageTracker = (postsResponse: GetPostsResponse) => {

    if (postsResponse.posts.length === 0) {
      this.pageTracker.lastPage = true;
    } else {
      this.pageTracker.page++;
    }

  }

  constructor(
    private http: HttpClient
  ) { }

  resetTracker(): void {

    this.pageTracker = {
      page: 1,
      lastPage: false
    };

  }

  getPosts(): Observable<GetPostsResponse> {
    return this
            .http
            .get<GetPostsResponse>(`${environment.url}/post?pagina=${this.pageTracker.page}`)
            .pipe(tap(this.updatePageTracker));
  }

}
