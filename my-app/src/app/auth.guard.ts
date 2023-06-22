import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}


  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const url: string = state.url;

  //   return this.checkLogin(url, next);
  // }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.checkLogin(url, next);
  }
  

  // checkLogin(url: string, route: ActivatedRouteSnapshot): boolean {
  
    
  //   console.log(this.authService.isLoggedIn());
  //   if (this.authService.isLoggedIn() ) {
  //     const roles = route.data['roles'] as String[];
  //     console.log(this.authService.getUserRole());
  //     if (roles && roles.indexOf(this.authService.getUserRole()) === -1) {
  //       console.log(this.authService.getUserRole());
  //       this.router.navigate(['']);
  //       return false;
  //     }

  //     return true;
  //   }
    
  
  //   this.authService.redirectUrl = url;
  
  //   this.router.navigate(['']);
  //   return false;
  // }
  checkLogin(url: string, route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          const roles = route.data['roles'] as string[];
          let role = this.authService.getUserRole();
          if(!role){
            role = "";
          }
          
          if (roles && roles.indexOf(role) === -1) {
            this.router.navigate(['']);
            return false;
          }
          return true;
        }
        this.authService.redirectUrl = url;
        this.router.navigate(['']);
        return false;
      })
    );
  }
  
}
