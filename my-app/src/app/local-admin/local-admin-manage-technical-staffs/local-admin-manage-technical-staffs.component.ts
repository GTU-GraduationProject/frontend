import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { ListTechnicalStaffs } from 'src/app/model/list-technical-staffs';
import { HttpResponse } from '@angular/common/http';
import { RequestService } from 'src/app/service/request-service.service';


const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-local-admin-manage-technical-staffs',
  templateUrl: './local-admin-manage-technical-staffs.component.html',
  styleUrls: ['./local-admin-manage-technical-staffs.component.scss']
})
export class LocalAdminManageTechnicalStaffsComponent implements OnInit{
    name : string | null = "";
   surname : string | null = "";
   role : string | null = "";

   
  technicalStaffs: BehaviorSubject<TechnicalStaffs[]> = new BehaviorSubject<TechnicalStaffs[]>([]); 
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
     
    this.getTechnicalStaffs();
  
   }
  
   getTechnicalStaffs(){
    this.technicalStaffs.next([]);
    this.requestService.listTechnicalStaffs(this.userId).subscribe((response: ListTechnicalStaffs[]) => {
      console.log(response);
      if (response) {
        response.forEach((item: ListTechnicalStaffs) => {
          console.log(item.userId, item.name, item.surname,item.brandId,item.brandName)
          const technicalStaff: TechnicalStaffs = {  
            id : item.userId,
            name : item.name,
            surname : item.surname,
            brandName: item.brandName,
            brandId : item.brandId,
            email: item.email,
            branchName: item.branchName,
            branchId : item.branchId
          };
          const updatedTechnicalStaff = this.technicalStaffs.getValue().concat(technicalStaff);
          this.technicalStaffs.next(updatedTechnicalStaff);
        })
        
      }
    });
    console.log(this.technicalStaffs); 
  }

  addTechnicalStaff(){
    this.router.navigate(['/local-admin/add-technical-staff']);
  }

  editTechnicalStaff(technicalStaff: any) {
    console.log('Edit technical staff:', technicalStaff);
    if(technicalStaff){
      this.dataSharingService.setTechnicalStaff(technicalStaff);
      this.router.navigate(['/local-admin/edit-technical-staff']);
    }

    
  }

  deleteTechnicalStaff(technicalStaff: any) {
    console.log('Delete technical staff:', technicalStaff);
    if(technicalStaff){

      this.requestService.deleteTechnicalStaff(technicalStaff.id).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Technical Staff has been successfully deleted.";
          }

          this.message = "Technical Staff has been successfully deleted.";
          this.addMessage(this.message);
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          } 
          
  
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.technicalStaffs.getValue();
          const updatedData = currentData.filter(staff => staff.id !== technicalStaff.id);
          this.technicalStaffs.next(updatedData);
        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Technical Staff could not be deleted.";
          }
          else {
            this.errorMessage = "An unknown error has occurred.";
          }
          this.addErrorMessage(this.errorMessage)
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
  getPage(page: number, pageSize: number): TechnicalStaffs[] {
    const allData = this.technicalStaffs.value; 
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


export class TechnicalStaffs{
  id : number = 0;
  name : string = "";
  surname : string = "";
  email: string = "";
  brandName: string = "";
  brandId : number = 0;
  branchName: string = "";
  branchId : number = 0;
  
}