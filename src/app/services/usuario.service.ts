import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from './../../environments/environment';
import { Observable, Subscriber, from } from 'rxjs';
import { AuthResponse } from 'src/interfaces/auth-response';
import { tap, map, switchMap } from 'rxjs/operators';
import { Usuario } from '../../interfaces/user';
import { UserInfoResponse } from 'src/interfaces/user-info-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string = null;
  public usuario: Usuario;

  private handleAuthResponseToken = (response: AuthResponse) => {

    if (response.ok) {
      this.saveToken(response.token);
    } else {
      this.token = null;
      this.storage.clear();
    }

  }

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  login(email: string, password: string): Observable<boolean> {

    const data = { email, password };

    return this
            .http
            .post<AuthResponse>(`${environment.url}/user/login`, data)
            .pipe(
              tap(this.handleAuthResponseToken),
              map((response: AuthResponse) => response.ok)
            );

  }

  signup(usuario: Usuario): Observable<boolean> {

    return this
            .http
            .post<AuthResponse>(`${environment.url}/user/create`, usuario)
            .pipe(
              tap(this.handleAuthResponseToken),
              map((response: AuthResponse) => response.ok)
            );

  }

  validateToken(): Observable<UserInfoResponse> {

    let httpHeaders = new HttpHeaders();

    return this
            .loadToken()
            .pipe(
              tap(
                (token: string) => {
                  if (!token) {
                    throw new Error('No token');
                  } else {
                    this.token = token;
                    httpHeaders = httpHeaders.append('x-token', token);
                  }
                }
              ),
              switchMap(
                () => this
                        .http
                        .get<UserInfoResponse>(`${environment.url}/user`, { headers: httpHeaders })
                        .pipe(
                          tap(
                            (response: UserInfoResponse) => {
                              if (response.ok) {
                                this.usuario = response.usuario;
                              }
                            }
                          )
                        )
              )
            );

  }

  private async saveToken(token: string): Promise<void> {
    this.token = token;
    await this.storage.set('token', token);
  }

  private loadToken(): Observable<string> {
    return from(this.storage.get('token')) as Observable<string>;
  }

}
