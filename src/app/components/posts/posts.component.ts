import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../interfaces/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input()
  public posts: Post[] = [];

  constructor() { }

  ngOnInit() {}

}
