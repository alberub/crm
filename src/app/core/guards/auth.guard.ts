import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private router: Router,             
               private userService: UserService ){}

  canLoad( route: Route, segments: UrlSegment[] ){
    return this.userService.validateToken()
                 .pipe(
                   tap( estaAutenticado => {
                     if ( !estaAutenticado ) {              
                      this.router.navigateByUrl('/login');
                     }                     
                   })
                 )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    
      return this.userService.validateToken()
                 .pipe(
                   tap( estaAutenticado => {
                     if ( !estaAutenticado ) {              
                      this.router.navigateByUrl('/login');
                     }                     
                   })
                 )

  }
  
}
