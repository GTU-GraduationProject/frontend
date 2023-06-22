import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sidebar-technical-staff',
  templateUrl: './sidebar-technical-staff.component.html',
  styleUrls: ['./sidebar-technical-staff.component.scss']
})
export class SidebarTechnicalStaffComponent {
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
    let sidebar = document.querySelector(".sidebar-manage-technical-staff");
    if (sidebar) {
      sidebar?.classList.toggle("open");
    }
 
    
  }
}
