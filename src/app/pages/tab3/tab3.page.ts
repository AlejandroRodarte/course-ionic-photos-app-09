import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../interfaces/user';
import { UsuarioService } from '../../services/usuario.service';
import { tap, catchError } from 'rxjs/operators';
import { UiService } from '../../services/ui.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public updateForm: FormGroup;

  public usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private postsService: PostsService,
    private uiService: UiService
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

    this
      .usuarioService
      .update(this.updateForm.value)
      .pipe(
        tap(() => {

          this.uiService.presentToast('Datos actualizados exitosamente');

          for (const key in this.updateForm.value) {
            if (this.usuario.hasOwnProperty(key)) {
              this.usuario[key] = this.updateForm.value[key];
            }
          }

          this.usuarioService.usuario = this.usuario;

        }),
        catchError(() => () => this.uiService.presentToast('No se pudo actualizar'))
      )
      .subscribe();

  }

  logout(): void {
    this.usuarioService.logout();
    this.postsService.resetTracker();
  }

  onAvatarSelected(avatarImg: string): void {
    this.updateForm.get('avatar').setValue(avatarImg);
  }

}
