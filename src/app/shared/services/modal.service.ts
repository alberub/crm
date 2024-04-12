import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Padron } from '../../core/interfaces/Padron.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal: boolean = false;
  private miSubject = new BehaviorSubject<any>(''); 

  constructor() { }

  getMiObservable(): Observable<Padron> {
    return this.miSubject.asObservable();
  }

  emitirNuevoValor(valor: any) {
    this.miSubject.next(valor);
  }

  toggleModal(): void{
    this.modal == true ? this.modal = false : this.modal = true;
  }

}
