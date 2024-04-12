import { Component, OnDestroy, OnInit } from '@angular/core';
import { GestionLlamada } from '../../../../core/interfaces/GestionLlamada.interface';
import { Padron } from '../../../../core/interfaces/Padron.interface';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ModalService } from '../../../../shared/services/modal.service';
import { Subscription, tap, timer } from 'rxjs';
import { Usuario } from '../../../../core/models/usuario.model';
import { UserService } from '../../../../shared/services/user.service';
import { GestionesService } from '../../../../shared/services/gestiones.service';
import { CommonModule } from '@angular/common';
import { UsuarioCrm } from '../../../../core/interfaces/NuevoUsuario.interface';

@Component({
  selector: 'app-admin-pages',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-pages.component.html',
  styleUrl: './admin-pages.component.css'
})
export class AdminPagesComponent  implements OnInit{
  
  gestionForm!: FormGroup;
  usuario: Usuario;
  validForm: boolean = false;
  arrErrors: Array<string> | undefined;
  existeError: boolean = false;
  toastSatate: boolean = false;

  constructor(private userService: UserService) {
    this.usuario = userService.usuario;
  }

  ngOnInit(): void {
    this.gestionForm = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      contrasenia: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      contrasenia2: new FormControl(null, [Validators.required, Validators.minLength(8)])
    }, { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const pass = control.get('contrasenia');
    const confirmPass = control.get('contrasenia2');
    
    if (pass && confirmPass && pass.value !== confirmPass.value) {      
      return { notSame: true };
    }
    this.validForm = true;
    return null;
  }

  crearUsuario(): void{
    this.arrErrors = [];
    if (this.gestionForm.valid) {
      console.log(this.gestionForm.value);
      
      this.validForm = true;
      const usuario: UsuarioCrm = {
        usuario:      this.gestionForm.value.nombre,
        password: this.gestionForm.value.contrasenia
      }    
      this.userService.crearUsuario(usuario)
        .subscribe( () => {      
          this.gestionForm.reset();    
          this.validForm = false;
          this.toast()
        }, err => {
          if (Array.isArray(err.error.errorMessage)) {
            this.arrErrors = err.error.errorMessage;
          } else{
            this.arrErrors?.push(err.error.errorMessage);
          }          
          this.existeError = true;
        });
    }
  }

  toast(){
    this.toastSatate = true;
    const timerObservable = timer(3000);
    timerObservable.pipe(
      tap(() => this.toastSatate = false)
    ).subscribe();
  }
  
  esTitular(): void {
  }
}