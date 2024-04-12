import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../../core/interfaces/UserResponse.interface';
import { catchError, map, of, tap } from 'rxjs';
import { User } from '../../core/interfaces/User.interface';
import { Usuario } from '../../core/models/usuario.model';
import { UsuarioCrm } from '../../core/interfaces/NuevoUsuario.interface';
import { RutasResponse } from '../../core/interfaces/RutasResponse.interface';
import { Ruta } from '../../core/models/ruta.model';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario!: User;
  constructor(private http: HttpClient) { }

  crearUsuario( usuario: UsuarioCrm ){
    return this.http.post(`${url}/usuarios/nuevo`, usuario)
  }

  getRutas() {
    return this.http.post<RutasResponse>(`${url}/usuarios/rutas`, {gestorId: this.usuario.id})
  }

  validateAdmin(){
    return this.http.post<boolean>(`${url}/usuarios/admin`, {gestorId: this.usuario.id})
      .pipe(        
        map(          
           ( res: boolean) => {                       
            return true
          }), catchError( () => of(false))
      );
  }

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


// rutas.datos.forEach( el => {
//   const ruta = new Ruta(el.ruta, el.icono);
//   this.rutas.push(ruta);
// });