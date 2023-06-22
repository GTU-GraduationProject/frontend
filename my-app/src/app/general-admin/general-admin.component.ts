import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-general-admin',
  templateUrl: './general-admin.component.html',
  styleUrls: ['./general-admin.component.scss']
})
export class GeneralAdminComponent implements OnInit {
 //html ve scss de isimler güncellenmeli aynı olursa hata veriyo çünkü.
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
   
 
  }

}
