import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Login } from '../../../core/interfaces/Login.interface';
import { ApiResponse } from '../../../core/interfaces/ApiResponse.interface';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _errMsg = new BehaviorSubject<string>('');
  private _hasError = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  setErrorMessage(message: string) {
    this._errMsg.next(message);
    this._hasError.next(true);
  }

  clearErrors() {
    this._errMsg.next('');
    this._hasError.next(false);
  }

  get errMsg() {
    return this._errMsg.asObservable();
  }

  get hasError() {
    return this._hasError.asObservable();
  }

  login(data: Login): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${url}/login`, data)
    .pipe(
      catchError((error: HttpErrorResponse) => {       
        this.setErrorMessage(error.error.errorMessage);        
        return throwError(() => new Error());
      })
    )
  }

}
