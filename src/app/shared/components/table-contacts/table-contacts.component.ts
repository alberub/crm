import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { GestionesService } from '../../services/gestiones.service';
import { Padron } from '../../../core/interfaces/Padron.interface';
import { PadronResponse } from '../../../core/interfaces/PadronResponse.interface';
import { CommonModule } from '@angular/common';
import { ConteoPaginas } from '../../../core/interfaces/ConteoPaginasResponse.interface';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-table-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-contacts.component.html',
  styleUrl: './table-contacts.component.css'
})
export class TableContactsComponent implements OnInit {

  private gestorId: number;
  padron: Padron[] = [];
  totalPaginas: number = 0;
  pagina: number = 1;

  constructor(private modalService: ModalService,private gestionesService: GestionesService, private userService: UserService) 
  {
    this.gestorId = userService.usuario.id;
  }

  ngOnInit(): void {
    this.getPadron();
    this.getTotalPages();
  }

  getPadron(){
    this.gestionesService.padronByGestor(this.pagina, this.gestorId)
      .subscribe( (padronResp: PadronResponse) => {
        this.padron = padronResp.datos;        
      });
  }

  getTotalPages(){
    this.gestionesService.getPagesCount(this.gestorId)
      .subscribe( (paginas: ConteoPaginas) => {
        this.totalPaginas = paginas.pages;        
      });
  }

  setPadron(valor: Padron){
    this.modalService.emitirNuevoValor(valor);
    this.modalService.toggleModal();
  }

  incrementarPagina(){
    if (this.pagina < this.totalPaginas) {
      this.pagina++;
      this.getPadron();
    }
  }

  decrementarPagina(){
    if(this.pagina > 1){
      this.pagina--;
      this.getPadron();
    }
  }

}
