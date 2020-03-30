import { Component, OnInit } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public tempImages: string[] = [];

  public postForm: FormGroup;

  public post: Post = {
    mensaje: '',
    coords: null
  };

  constructor(
    private postsService: PostsService,
    private navController: NavController
  ) {}

  ngOnInit() {

    this.postForm = new FormGroup({
      mensaje: new FormControl(this.post.mensaje, [Validators.required]),
      coords: new FormControl(null)
    });

  }

  createPost(): void {

    this
      .postsService
      .createPost(this.postForm.value)
      .pipe(
        tap(() => {
          this.navController.navigateForward('/main/tabs/tab1');
          this.postForm.reset();
        })
      )
      .subscribe();

  }

}
