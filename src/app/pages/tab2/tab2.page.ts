import { Component, OnInit } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare const window: any;

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

  public loadingGeo = false;

  constructor(
    private postsService: PostsService,
    private navController: NavController,
    private geoLocation: Geolocation,
    private camera: Camera
  ) {}

  ngOnInit() {

    this.postForm = new FormGroup({
      mensaje: new FormControl(this.post.mensaje, [Validators.required]),
      coords: new FormControl(null),
      posicion: new FormControl(false)
    });

  }

  createPost(): void {

    delete this.postForm.value.posicion;

    this
      .postsService
      .createPost(this.postForm.value)
      .pipe(
        tap(() => {
          this.navController.navigateForward('/main/tabs/tab1');
          this.postForm.reset();
          this.tempImages = [];
        })
      )
      .subscribe();

  }

  async onGeolocationToggle(): Promise<void> {

    if (!this.postForm.value.posicion) {
      this.postForm.get('coords').setValue(null);
      return;
    }

    this.loadingGeo = true;

    try {

      const { coords } = await this.geoLocation.getCurrentPosition({ timeout: 90000 });
      this.postForm.get('coords').setValue(`${coords.latitude},${coords.longitude}`);
      console.log(this.postForm.value);

      this.loadingGeo = false;

    } catch (e) {
      this.loadingGeo = false;
    }

  }

  async onCameraClick(): Promise<void> {

    const cameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    await this.processImage(cameraOptions);

  }

  async onLibraryClick(): Promise<void> {

    const cameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    await this.processImage(cameraOptions);

  }

  async processImage(cameraOptions: CameraOptions): Promise<void> {

    try {

      const imageData = await this.camera.getPicture(cameraOptions);

      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);

      await this.postsService.uploadImage(imageData);

      this.tempImages.push(img);
      console.log(this.tempImages);

    } catch (e) {
      console.log(e);
    }

  }

}
