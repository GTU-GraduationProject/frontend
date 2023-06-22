import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { ListPost } from 'src/app/model/list-post';
import { BehaviorSubject } from 'rxjs';

import { HttpResponse } from '@angular/common/http';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';

const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-general-admin-manage-local-admins',
  templateUrl: './general-admin-manage-local-admins.component.html',
  styleUrls: ['./general-admin-manage-local-admins.component.scss']
})
export class GeneralAdminManageLocalAdminsComponent implements OnInit {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";
  //localAdmins : LocalAdmis [] = [];
  localAdmins: BehaviorSubject<LocalAdmins[]> = new BehaviorSubject<LocalAdmins[]>([]); 
  displayedColumns: string[] = ['id', 'name', 'actions'];

  message : string = "";
  errorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;

  errorMessages: string[] = [];
  messages: string[] = [];

  currentPage: number = 1; // Current page number
  pageSize: number = 10; // Number of items to display per page
 

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService,
    private dataSharingService : DataSharingService) {}

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
    this.getLocalAdmins();
 
  }

 
  addLocalAdmin(){
   // console.warn("add local admin button clicked");
    this.router.navigate(['/general-admin/add-local-admin']);
  }
 
  getLocalAdmins(){

    this.localAdmins.next([]);
    this.requestService.listLocalAdmins().subscribe((response: ListPost[]) => {
      console.log(response);
      if (response) {
        response.forEach((item: ListPost) => {
        //  console.log(item.userId, item.name, item.surname,item.brandId,item.brandName)
          const localAdmin: LocalAdmins = {  
            id : item.userId,
            name : item.name,
            surname : item.surname,
            brandName: item.brandName,
            brandId : item.brandId,
            email: item.email
          };
          const updatedLocalAdmins = this.localAdmins.getValue().concat(localAdmin);
          this.localAdmins.next(updatedLocalAdmins);
        })
        
      }
    });
    
 //   console.log(this.localAdmins); 
  }

  getPage(page: number, pageSize: number): LocalAdmins[] {
    const allData = this.localAdmins.value; 
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex); 
  }
  

  editLocalAdmin(localAdmin: any) {
    console.log('Edit local admin:', localAdmin);
    if(localAdmin){
      this.dataSharingService.setLocalAdmin(localAdmin);
      this.router.navigate(['/general-admin/edit-local-admin']);
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

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  deleteLocalAdmin(localAdmin: any) {
//    console.log('Delete local admin:', localAdmin);
    if(localAdmin){

      this.requestService.deleteLocalAdmin(localAdmin.id).subscribe(
        (response: HttpResponse<any>) => {
          //console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Local admin has been successfully deleted.";
          }

          this.message = "Local admin has been successfully deleted.";
          this.addMessage(this.message);
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
  
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.localAdmins.getValue();
          const updatedData = currentData.filter(admin => admin.id !== localAdmin.id);
          this.localAdmins.next(updatedData);

        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Local admin could not be deleted.";
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


export class LocalAdmins{
  id : number = 0;
  name : string = "";
  surname : string = "";
  brandName: string = "";
  brandId : number = 0;
  email: string = "";
  


}

