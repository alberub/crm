import { Component } from '@angular/core';
import { TableContactsComponent } from '../../../../shared/components/table-contacts/table-contacts.component';
import { ModalGestionComponent } from '../../../../shared/components/modal-gestion/modal-gestion.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { UserService } from '../../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home-pages',
  standalone: true,
  imports: [TableContactsComponent, ModalGestionComponent, CommonModule],
  templateUrl: './home-pages.component.html',
  styleUrl: './home-pages.component.css'
})
export class HomePagesComponent {

  sidebarState: boolean = false;

  constructor(public  modalService: ModalService, 
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {}

  public readonly usuario = this.userService.usuario.usuario;

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.authService.clearErrors();
  }

  toggleSidebar(){
    this.sidebarState == true ?
    this.sidebarState = false :
    this.sidebarState = true;    
  }

}
