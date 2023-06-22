import { Component } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-branch-manager',
  templateUrl: './sidebar-branch-manager.component.html',
  styleUrls: ['./sidebar-branch-manager.component.scss']
})
export class SidebarBranchManagerComponent {

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
    let sidebar = document.querySelector(".sidebar-manage-branch-manager");
    if (sidebar) {
      sidebar?.classList.toggle("open");
    }
 
    
  }

}
