import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth-service.service';
import { UserRole } from './user-role/user-role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  isLoggedIn : boolean = false;

  constructor(private router: Router, private authService: AuthService) {}


  ngOnInit(): void { 

    if (this.authService.getToken()) {
      
    } else {
      this.authService.logout();
    }

    
  }


}
