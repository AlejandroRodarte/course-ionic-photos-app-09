import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../interfaces/user';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public updateForm: FormGroup;

  public usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {

    this.usuario = this.usuarioService.usuario;

    this.updateForm = new FormGroup({
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      nombre: new FormControl(this.usuario.nombre, [Validators.required]),
      avatar: new FormControl(this.usuario.avatar, [Validators.required])
    });

  }

  onSubmit(): void {

  }

  logout(): void {

  }

  onAvatarSelected(avatarImg: string): void {
    this.updateForm.get('avatar').setValue(avatarImg);
  }

}
