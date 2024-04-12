import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  return true;
};
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private router: Router,             
               private userService: UserService ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    
    return this.userService.validateAdmin()
                .pipe(
                  tap( esAdmin => {
                    if ( !esAdmin ) {              
                    this.router.navigateByUrl('');
                    }                     
                  })
                )

  }
  
}
