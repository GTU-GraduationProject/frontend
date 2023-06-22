import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-local-admin',
  templateUrl: './local-admin.component.html',
  styleUrls: ['./local-admin.component.scss']
})
export class LocalAdminComponent implements OnInit{
   name : string | null = "";
   surname : string | null = "";
   role : string | null = "";
   userId : number = 0;

  
 
   constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.userId = parseInt(localStorage.getItem('userId')!, 10);
     
   }
 
   ngOnInit(): void {
     this.name = this.authService.getUserName();
     this.surname = this.authService.getUserSurname();
     this.userId = parseInt(localStorage.getItem('userId')!, 10);
     
  
   }
 
 
   logout(){
     this.authService.logout();
 
   }
}
