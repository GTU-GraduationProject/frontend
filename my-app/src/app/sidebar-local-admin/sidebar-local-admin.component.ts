import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sidebar-local-admin',
  templateUrl: './sidebar-local-admin.component.html',
  styleUrls: ['./sidebar-local-admin.component.scss']
})
export class SidebarLocalAdminComponent {
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
    let sidebar = document.querySelector(".sidebar-manage-local-admin");
    if (sidebar) {
      sidebar?.classList.toggle("open");
    }
 
    
  }

}
