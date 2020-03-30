import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetPostsResponse } from 'src/interfaces/get-posts-response';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { PageTracker } from 'src/interfaces/page-tracker';
import { tap } from 'rxjs/operators';
import { CreatePostResponse } from 'src/interfaces/create-post-response';
import { UsuarioService } from './usuario.service';
import { Post } from '../../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public pageTracker: PageTracker = {
    page: 1,
    lastPage: false
  };

  public postCreated = new Subject<Post>();

  private updatePageTracker = (postsResponse: GetPostsResponse) => {

    if (postsResponse.posts.length === 0) {
      this.pageTracker.lastPage = true;
    } else {
      this.pageTracker.page++;
    }

  }

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
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

  createPost(post: Post): Observable<CreatePostResponse> {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this
            .http
            .post<CreatePostResponse>(`${environment.url}/post`, post, { headers })
            .pipe(tap((response: CreatePostResponse) => this.postCreated.next(response.post)));

  }

}
