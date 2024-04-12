import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Padron } from '../../../core/interfaces/Padron.interface';
import { GestionLlamada } from '../../../core/interfaces/GestionLlamada.interface';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../../core/models/usuario.model';
import { GestionesService } from '../../services/gestiones.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-gestion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-gestion.component.html',
  styleUrl: './modal-gestion.component.css'
})
export class ModalGestionComponent implements OnInit, OnDestroy{

  checkTitular: boolean = true;
  gestionForm!: FormGroup;
  nombreCompleto: string = "";
  padron!: Padron;
  usuario: Usuario;
  sub$!: Subscription;

  constructor(public modalService: ModalService, private userService: UserService, private gestionService: GestionesService) {
    this.usuario = userService.usuario;
  }

  ngOnInit(): void {
    this.sub$ = this.modalService.getMiObservable()
      .subscribe( (padron: Padron) => {
        this.padron = padron;
        navigator.clipboard.writeText(padron.telefono);
        this.nombreCompleto = padron.nombre + ' ' + padron.ape_paterno + ' ' + padron.ape_materno;
      });

      this.gestionForm = new FormGroup({
        nombre:        new FormControl( this.nombreCompleto , Validators.required), //inhabilitar
        telefono:      new FormControl( this.padron.telefono, Validators.required), //inhabilitar
        simpatiza:     new FormControl( null, Validators.required),
        estatus:       new FormControl( 'Contesta', Validators.required),
        titular:       new FormControl( true, Validators.required),
        nombreExtra:   new FormControl( '' ),
        telefonoExtra: new FormControl( '' ),
        direccion:     new FormControl( '' ),
        comentarios:   new FormControl( null)        
      })
  }

  crearGestion(): void{
    const gestion: GestionLlamada = {
      nombre:        this.gestionForm.value.nombre,
      telefono:      this.gestionForm.value.telefono,
      simpatizante:  this.gestionForm.value.simpatiza,
      comentario:    this.gestionForm.value.comentarios,
      gestor:        this.usuario.usuario,
      gestorId:      this.usuario.id,
      distrito:      this.padron.distrito,
      claveUnica:    this.padron.clave_unica,
      titular:       this.gestionForm.value.titular,
      estatus:       this.gestionForm.value.estatus,
      telefonoExtra: this.gestionForm.value.telefonoExtra,
      nombreExtra:   this.gestionForm.value.nombreExtra,
      direccion:     this.gestionForm.value.direccion
    }
    this.gestionService.crearGestion(gestion)
      .subscribe( () => {
        this.modalService.toggleModal();
      })
  }
  
  esTitular(): void {
  }

  ngOnDestroy(): void {    
    this.modalService.emitirNuevoValor('')
    this.sub$.unsubscribe();
  }

}
