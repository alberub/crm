import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PadronResponse } from '../../core/interfaces/PadronResponse.interface';
import { ConteoPaginas } from '../../core/interfaces/ConteoPaginasResponse.interface';
import { environment } from '../../../environments/environment';
import { GestionLlamada } from '../../core/interfaces/GestionLlamada.interface';
import { BehaviorSubject } from 'rxjs';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GestionesService {

  gestion$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  crearGestion(gestion: GestionLlamada){
    return this.http.post(`${url}/gestion/crear`, gestion);
  }

  padronByGestor(page: number, gestotId: number){
    return this.http.get<PadronResponse>(`${url}/padron?limit=10&page=${page}&gestorId=${gestotId}`);
  }

  getPagesCount(gestotId: number){
    return this.http.get<ConteoPaginas>(`${url}/paginado/paginas?gestorId=${gestotId}`);
  }

}
