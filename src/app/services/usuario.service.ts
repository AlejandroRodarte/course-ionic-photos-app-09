import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/interfaces/auth-response';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string = null;

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
              tap(
                (response: AuthResponse) => {

                  if (response.ok) {
                    this.saveToken(response.token);
                  } else {
                    this.token = null;
                    this.storage.clear();
                  }

                }
              ),
              map((response: AuthResponse) => response.ok)
            );

  }

  private async saveToken(token: string): Promise<void> {
    this.token = token;
    await this.storage.set('token', token);
  }

}
