import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technical-staff',
  templateUrl: './technical-staff.component.html',
  styleUrls: ['./technical-staff.component.scss']
})
export class TechnicalStaffComponent implements OnInit{
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
   
 
  }

  logout(){
    this.authService.logout();

  }
}
