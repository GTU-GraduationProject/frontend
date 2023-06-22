import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-general-admin',
  templateUrl: './sidebar-general-admin.component.html',
  styleUrls: ['./sidebar-general-admin.component.scss']
})
export class SidebarGeneralAdminComponent implements OnInit {
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
    let sidebar = document.querySelector(".sidebar-manage-general-admin");
    if (sidebar) {
      sidebar?.classList.toggle("open");
    }
 
    
  }

  

}
