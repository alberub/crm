import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../../../core/interfaces/Login.interface';
import { ApiResponse } from '../../../../core/interfaces/ApiResponse.interface';
import { Router } from '@angular/router';
import { Subscription, catchError, interval, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth-pages',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-pages.component.html',
  styleUrl: './auth-pages.component.css'
})
export class AuthPagesComponent implements OnInit, OnDestroy {

  errMsg: string = '';
  hasErr: boolean = false;
  private errorSubscriptions = new Subscription();
  public loginForm!: FormGroup;
  tipo: string = "password";

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usuario:  new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });    
    const errMsgSub = this.authService.errMsg.subscribe(message => this.errMsg = message);
    const hasErrSub = this.authService.hasError.subscribe(hasError => this.hasErr = hasError);

    this.errorSubscriptions.add(errMsgSub);
    this.errorSubscriptions.add(hasErrSub);
  }

  login(){
    const usuario: string = this.loginForm.value.usuario;
    const password: string = this.loginForm.value.password;
    const login: Login = {usuario, password};
    this.authService.login(login)
      .subscribe( (response: ApiResponse) => {
        localStorage.setItem('token', response.datos);
        this.router.navigateByUrl('/');
      })
  }

  seePass(){
    this.tipo == "password" ? 
    this.tipo = "text" : 
    this.tipo = "password";
  }

  cerrarToast(){
    this.hasErr = false;
  }

  ngOnDestroy(): void {
    this.errorSubscriptions.unsubscribe();
  }

}
