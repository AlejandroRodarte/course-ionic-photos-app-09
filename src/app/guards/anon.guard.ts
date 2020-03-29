import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { NavController } from '@ionic/angular';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnonGuard implements CanLoad {

  constructor(
    private usuarioService: UsuarioService,
    private navController: NavController
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this
            .usuarioService
            .validateToken()
            .pipe(
              map(() => {
                this.navController.navigateRoot('/main/tabs/tab1');
                return false;
              }),
              catchError(() => of(true))
            );

  }

}
