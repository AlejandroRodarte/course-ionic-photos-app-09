import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Avatar } from 'src/interfaces/avatar';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { tap, catchError } from 'rxjs/operators';
import { UiService } from '../../services/ui.service';
import { Usuario } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlides', { static: false })
  public mainSlides: IonSlides;

  public mainSlideOpts = {
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping'
  };

  public testLoginUser = {
    email: 'usuario2@gmail.com',
    password: '1234'
  };

  public testSignupUser: Usuario = {
    email: 'test@test.com',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  public loginForm: FormGroup;
  public signupForm: FormGroup;

  private handleNavigation = (ok: boolean) => {
    if (ok) {
      this.navController.navigateRoot('/main/tabs/tab1', { animated: true });
    }
  }

  private handleAlert = (message: string) => () => this.uiService.presentAlert(message);

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
      email: new FormControl(this.testSignupUser.email, [Validators.required, Validators.email]),
      nombre: new FormControl(this.testSignupUser.nombre, [Validators.required]),
      password: new FormControl(this.testSignupUser.password, [Validators.required]),
      avatar: new FormControl(this.testSignupUser.avatar, [Validators.required])
    });

  }

  onAvatarSelected(avatarImg: string) {
    this.signupForm.get('avatar').setValue(avatarImg);
  }

  onLoginSubmit(): void {

    const { email, password }: { email: string, password: string } = this.loginForm.value;

    this
      .usuarioService
      .login(email, password)
      .pipe(
        tap(this.handleNavigation),
        catchError(this.handleAlert('Usuario y password no son correctos'))
      )
      .subscribe();

  }

  onSignupSubmit(): void {

    this
      .usuarioService
      .signup(this.signupForm.value as Usuario)
      .pipe(
        tap(this.handleNavigation),
        catchError(this.handleAlert('Ese correo electrónico ya existe'))
      )
      .subscribe();

  }

  moveToSlide(slideIndex: number) {
    this.mainSlides.slideTo(slideIndex);
  }

}
