import { Component, OnInit } from '@angular/core';
import { TableContactsComponent } from '../../../../shared/components/table-contacts/table-contacts.component';
import { ModalGestionComponent } from '../../../../shared/components/modal-gestion/modal-gestion.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { UserService } from '../../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { GestionesService } from '../../../../shared/services/gestiones.service';
import { Subscription, tap, timer } from 'rxjs';
import { Ruta } from '../../../../core/models/ruta.model';
import { RutasResponse } from '../../../../core/interfaces/RutasResponse.interface';

@Component({
  selector: 'app-home-pages',
  standalone: true,
  imports: [TableContactsComponent, ModalGestionComponent, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home-pages.component.html',
  styleUrl: './home-pages.component.css'
})
export class HomePagesComponent implements OnInit {

  sidebarState: boolean = false;
  toastSatate: boolean = false;
  private sub$: Subscription = new Subscription();
  rutas: Ruta[] = [];

  constructor(public  modalService: ModalService, 
              private gestionService: GestionesService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.sub$.add(this.gestionService.gestion$.subscribe( valor => {
      this.toastSatate = valor;
      this.toast();
    }));
    this.getRutas();
    
  }

  public readonly usuario = this.userService.usuario.usuario;

  getRutas(){
    this.userService.getRutas()
      .subscribe( (rutas: RutasResponse) => {
        rutas.datos.forEach( ruta => {
          console.log(ruta);
          
          let r = new Ruta(ruta.ruta, ruta.icono);
          this.rutas.push(r)
        })
      })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.authService.clearErrors();
  }

  toast(){
    const timerObservable = timer(3000);
    timerObservable.pipe(
      tap(() => this.toastSatate = false)
    ).subscribe();
  }

  toggleSidebar(){
    this.sidebarState == true ?
    this.sidebarState = false :
    this.sidebarState = true;    
  }

}
