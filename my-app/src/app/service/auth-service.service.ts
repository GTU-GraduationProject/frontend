import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginPost } from '../model/login-post';
import { LoginRequest } from '../model/login-request';
import { filter, take, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  redirectUrl: string = '';
  private userRole : string = "";
  private userName : string = "";
  private userSurname : string = "";

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();

  }

  login(req : LoginRequest) : Observable<LoginPost>{
  
    return this.http.post<LoginPost>("/api/login", req)
    .pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
        if(response.role){
          this.userRole = response.role;
          localStorage.setItem('userRole', response.role);
        }
        if(response.name){
          this.userName = response.name;
          localStorage.setItem('userName', response.name);
        }
        if(response.surname){
          this.userSurname = response.surname;
          localStorage.setItem('userSurname', response.surname);
        }
      })
    );
  }

  logout() {
    // console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
    this.loggedIn.next(false);    
    // console.log(localStorage.getItem('token'));
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userSurname');
    localStorage.removeItem('userId');
    this.userRole = "";
    this.router.navigate(['']);
  
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }



  private checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
    else {
      this.loggedIn.next(false);
    }
    // console.log(token);
  }

  getUserRole() : string | null{
    return localStorage.getItem('userRole');
   // return this.userRole;
  }

  getUserName() : string | null{
   // return this.userName;
    return localStorage.getItem('userName');
  }

  getUserSurname() : string | null{
   // return this.userSurname;
    return localStorage.getItem('userSurname');
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }



  
 
  

}
