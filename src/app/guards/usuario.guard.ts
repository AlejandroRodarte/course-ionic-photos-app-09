import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { UsuarioService } from '../services/usuario.service';
import { map, catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor(
    private usuarioService: UsuarioService,
    private navController: NavController
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this
            .usuarioService
            .validateToken()
            .pipe(
              map(() => true),
              catchError(() => {
                this.navController.navigateRoot('/login');
                return of(false);
              })
            );
  }

}
