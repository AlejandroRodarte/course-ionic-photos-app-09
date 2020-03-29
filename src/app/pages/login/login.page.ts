import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Avatar } from 'src/interfaces/avatar';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  public loginForm: FormGroup;
  public signupForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
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
    console.log(this.loginForm.value);
  }

  onSignupSubmit(): void {
    console.log(this.signupForm.value);
  }

}
