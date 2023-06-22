import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { RequestService } from 'src/app/service/request-service.service';
import { ListBranchManagers } from 'src/app/model/list-branch-managers';
import { HttpResponse } from '@angular/common/http';

const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-local-admin-manage-branch-managers',
  templateUrl: './local-admin-manage-branch-managers.component.html',
  styleUrls: ['./local-admin-manage-branch-managers.component.scss']
})
export class LocalAdminManageBranchManagersComponent implements OnInit{
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  branchManagers: BehaviorSubject<BranchManagers[]> = new BehaviorSubject<BranchManagers[]>([]); 
  displayedColumns: string[] = ['id', 'name', 'actions'];

  
  message : string = "";
  errorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;

  errorMessages: string[] = [];
  messages: string[] = [];


  currentPage: number = 1; // Current page number
  pageSize: number = 10; // Number of items to display per page
 
  userId : number = 0;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService,
    private dataSharingService : DataSharingService) {
      this.userId = parseInt(localStorage.getItem('userId')!, 10);
     
    }

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
    this.userId = parseInt(localStorage.getItem('userId')!, 10);
     
    this.getBranchManagers();
 
  }
  

  getBranchManagers(){
    this.branchManagers.next([]);
    this.requestService.listBranchManagers().subscribe((response: ListBranchManagers[]) => {
      console.log(response);
      if (response) {
        response.forEach((item: ListBranchManagers) => {
         // console.log(item.userId, item.name, item.surname,item.brandId,item.brandName)
          const branchManager: BranchManagers = {  
            id : item.userId,
            name : item.name,
            surname : item.surname,
            brandName: item.brandName,
            brandId : item.brandId,
            email: item.email,
            branchName: item.branchName,
            branchId : item.branchId
          };
          const updatedBranchManagers = this.branchManagers.getValue().concat(branchManager);
          this.branchManagers.next(updatedBranchManagers);
        })
        
      }
    });
   // console.log(this.branchManagers); 
  }

  getPage(page: number, pageSize: number): BranchManagers[] {
    const allData = this.branchManagers.value; 
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex); 
  }


  logout(){
    this.authService.logout();

  }

  addBranchManager(){
    this.router.navigate(['/local-admin/add-branch-manager']);
  }

  editBranchManager(branchManager: any) {
   // console.log('Edit branch manager:', branchManager);
    if(branchManager){
      this.dataSharingService.setBranchManager(branchManager);
      this.router.navigate(['/local-admin/edit-branch-manager']);
    }

    
  }

  deleteBranchManager(branchManager: any) {
   // console.log('Delete branch manager:', branchManager);
    if(branchManager){

      this.requestService.deleteBranchManager(branchManager.id).subscribe(
        (response: HttpResponse<any>) => {
        //  console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Branch manager has been successfully deleted.";
          }

          this.message = "Branch manager has been successfully deleted.";
          this.addMessage(this.message);
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
  
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.branchManagers.getValue();
          const updatedData = currentData.filter(manager => manager.id !== branchManager.id);
          this.branchManagers.next(updatedData);
        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Branch manager could not be deleted.";
          }
          else {
            this.errorMessage = "An unknown error has occurred.";
          }
          this.addErrorMessage(this.errorMessage);
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
  
          this.timeoutID = setTimeout(() => {
            this.removeErrorMessage(this.errorMessage);
          }, 5000);

        
        }
      )



    }

    
   
  }

  goPreviousPage(){
    if(this.currentPage!=1){
      this.currentPage = this.currentPage -1;
    }
  }
  goNextPage(){
   
    this.currentPage = this.currentPage + 1;
   
  }

  addErrorMessage(message: string) {
    this.errorMessages.push(message);
    setTimeout(() => this.removeErrorMessage(message), MESSAGE_TIMEOUT);
  }
 
  removeErrorMessage(errorMessage: string) {
    const index = this.errorMessages.indexOf(errorMessage);
    if (index > -1) {
      this.errorMessages.splice(index, 1);
    }
    this.resetErrorMessage();
  }

  removeMessage(message: string) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
    this.resetMessage();
  }

  addMessage(message: string) {
    this.messages.push(message);
    setTimeout(() => this.removeMessage(message), MESSAGE_TIMEOUT);
  }

  resetMessage(){
    this.message="";

  }

  

  resetErrorMessage(){
    this.errorMessage="";
  }

 
}

export class BranchManagers{
  id : number = 0;
  name : string = "";
  surname : string = "";
  email: string = "";
  brandName: string = "";
  brandId : number = 0;
  branchName: string = "";
  branchId : number = 0;
  
}
