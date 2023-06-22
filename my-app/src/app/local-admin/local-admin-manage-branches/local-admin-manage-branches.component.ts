import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { RequestService } from 'src/app/service/request-service.service';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { BehaviorSubject } from 'rxjs';
import { ListBranch } from 'src/app/model/list-branch';


const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-local-admin-manage-branches',
  templateUrl: './local-admin-manage-branches.component.html',
  styleUrls: ['./local-admin-manage-branches.component.scss']
})
export class LocalAdminManageBranchesComponent implements OnInit{
    name : string | null = "";
   surname : string | null = "";
   role : string | null = "";
   branches: BehaviorSubject<Branches[]> = new BehaviorSubject<Branches[]>([]); 
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
     
    this.getBranches();
  
   }
   getBranches(){

    this.requestService.listBranches().subscribe((response: ListBranch[]) => {
      console.log(response);
      if (response) {
        response.forEach((item: ListBranch) => {
          const branch: Branches = {  
            brandId : item.brandId,
            brandName : item.brandName,
            brandLogo : item.brandLogo,
            branchId : item.branchId,
            branchName: item.branchName,
            branchManagerId: item.branchManagerId,
            branchManagerName : item.branchManagerName,
            branchManagerSurname : item.branchManagerSurname

            
          };
          const updatedBranchManagers = this.branches.getValue().concat(branch);
          this.branches.next(updatedBranchManagers);
        })
        
      }
    });
    console.log(this.branches); //?
  }

  addBranch(){
    this.router.navigate(['/local-admin/add-branch']);
  }

  editBranch(branch: any) {
    console.log('Edit Branch:', branch);
    if(branch){
      this.dataSharingService.setBranch(branch);
      this.router.navigate(['/local-admin/edit-branch']);
    }

    
  }

  deleteBranch(branch: any) {
    console.log('Delete branch:', branch);
    if(branch){
      
      this.requestService.deleteBranch(branch.branchId).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Branch has been successfully deleted.";
          }

          this.message = "Branch has been successfully deleted.";

          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
          this.addMessage(this.message);
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.branches.getValue();
          const updatedData = currentData.filter(branch_ => branch_.branchId !== branch.branchId);
          this.branches.next(updatedData);
        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Branch could not be deleted.";
          }
          else {
            this.errorMessage = "An unknown error has occurred.";
          }
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
          this.addErrorMessage(this.errorMessage)
          this.timeoutID = setTimeout(() => {
            this.removeErrorMessage(this.errorMessage);
          }, 5000);

        
        }
      )



    }

    
   
  }

  getPage(page: number, pageSize: number): Branches[] {
    const allData = this.branches.value; 
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex); 
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


export class Branches{
  brandId : number = 0;
  brandName: string = "";
  brandLogo: string = ""; 
  branchId : number = 0; 
  branchName: string = "";
  branchManagerId : number = 0;   
  branchManagerName: string = "";
  branchManagerSurname: string = "";
  
}
