import { Component, OnInit } from '@angular/core';
import { TableContactsComponent } from '../../../../shared/components/table-contacts/table-contacts.component';
import { ModalGestionComponent } from '../../../../shared/components/modal-gestion/modal-gestion.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { UserService } from '../../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { GestionesService } from '../../../../shared/services/gestiones.service';
import { Subscription, tap, timer } from 'rxjs';

@Component({
  selector: 'app-home-pages',
  standalone: true,
  imports: [TableContactsComponent, ModalGestionComponent, CommonModule],
  templateUrl: './home-pages.component.html',
  styleUrl: './home-pages.component.css'
})
export class HomePagesComponent implements OnInit {

  sidebarState: boolean = false;
  toastSatate: boolean = false;
  private sub$: Subscription = new Subscription();

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
  }

  public readonly usuario = this.userService.usuario.usuario;

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
