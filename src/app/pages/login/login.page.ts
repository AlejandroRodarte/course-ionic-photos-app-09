import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Avatar } from 'src/interfaces/avatar';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { tap, catchError } from 'rxjs/operators';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlides', { static: false })
  public mainSlides: IonSlides;

  public avatars: Avatar[] = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    }
  ];

  public avatarSlideOpts = {
    slidesPerView: 3.5
  };

  public mainSlideOpts = {
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping'
  };

  public testLoginUser = {
    email: 'usuario2@gmail.com',
    password: '1234'
  };

  public loginForm: FormGroup;
  public signupForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private navController: NavController,
    private uiService: UiService
  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl(this.testLoginUser.email, [Validators.required, Validators.email]),
      password: new FormControl(this.testLoginUser.password, [Validators.required])
    });

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      nombre: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

  }

  onSelectAvatar(avatar: Avatar): void {
    this.avatars.find((currentAvatar: Avatar) => currentAvatar.seleccionado).seleccionado = false;
    avatar.seleccionado = true;
  }

  onLoginSubmit(): void {

    const { email, password }: { email: string, password: string } = this.loginForm.value;

    this
      .usuarioService
      .login(email, password)
      .pipe(
        tap((ok: boolean) => {
          if (ok) {
            this.navController.navigateRoot('/main/tabs/tab1', { animated: true });
          }
        }),
        catchError(() => this.uiService.presentAlert('Usuario y password no son correctos.'))
      )
      .subscribe();

  }

  onSignupSubmit(): void {
    console.log(this.signupForm.value);
  }

  moveToSlide(slideIndex: number) {
    this.mainSlides.slideTo(slideIndex);
  }

}
