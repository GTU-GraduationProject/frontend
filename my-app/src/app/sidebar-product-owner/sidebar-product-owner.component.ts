import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-product-owner',
  templateUrl: './sidebar-product-owner.component.html',
  styleUrls: ['./sidebar-product-owner.component.scss']
})
export class SidebarProductOwnerComponent {
  name : string | null = "";
  surname : string | null = "";
  role : string = "";


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
  }

  logout(){
    this.authService.logout();

  }

  toggleSidebar(): void {
    let sidebar = document.querySelector(".sidebar-manage-product-owner");
    if (sidebar) {
      sidebar?.classList.toggle("open");
    }
 
    
  }
}
