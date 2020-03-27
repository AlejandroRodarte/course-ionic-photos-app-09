import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../interfaces/post';
import { GetPostsResponse } from '../../../interfaces/get-posts-response';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public posts: Post[] = [];

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {

    this
      .postsService
      .getPosts()
      .subscribe((response: GetPostsResponse) => {
        console.log(this.posts);
        this.posts = response.posts;
      });

  }

}
