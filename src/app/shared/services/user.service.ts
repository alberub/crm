import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../../core/interfaces/UserResponse.interface';
import { catchError, map, of } from 'rxjs';
import { User } from '../../core/interfaces/User.interface';
import { Usuario } from '../../core/models/usuario.model';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario!: User;

  constructor(private http: HttpClient) { }

  validateToken(){
    return this.http.get<UserResponse>(`${url}/login/renew`)
      .pipe(
        map( (resp: UserResponse) => {
          const { id, usuario } = resp.usuario;
          this.usuario = new Usuario(id, usuario);
          localStorage.setItem('token', resp.token);
          return true;
        }), catchError( () => of(false))
      );
  }

}
