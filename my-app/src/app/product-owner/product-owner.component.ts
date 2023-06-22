import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-owner',
  templateUrl: './product-owner.component.html',
  styleUrls: ['./product-owner.component.scss']
})
export class ProductOwnerComponent {

  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
   
 
  }
  

}
