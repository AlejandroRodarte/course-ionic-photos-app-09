import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { environment } from '../../../environments/environment';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @ViewChild(IonSlides, { static: false })
  public slides: IonSlides;

  @Input()
  public post: Post;

  public url = environment.url;

  constructor() { }

  @HostListener('window:resize')
  onResize() {

    if (this.slides) {
      setTimeout(() => this.slides.update(), 200);
    }

  }


  ngOnInit() {}

}
