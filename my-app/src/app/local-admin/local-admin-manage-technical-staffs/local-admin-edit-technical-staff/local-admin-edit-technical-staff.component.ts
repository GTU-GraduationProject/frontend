import { Component, OnInit } from '@angular/core';
import { TechnicalStaffs } from '../local-admin-manage-technical-staffs.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { AuthService } from 'src/app/service/auth-service.service';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { HttpResponse } from '@angular/common/http';

const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-local-admin-edit-technical-staff',
  templateUrl: './local-admin-edit-technical-staff.component.html',
  styleUrls: ['./local-admin-edit-technical-staff.component.scss']
})
export class LocalAdminEditTechnicalStaffComponent implements OnInit {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  technicalStaff : TechnicalStaffs = {
    id :  0,
    name :  "",
    surname :  "",
    email:  "",
    brandName:  "",
    brandId :  0,
    branchName:  "",
    branchId :  0
  }


  
  message : string = "";
  errorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;

  errorMessages: string[] = [];
  messages: string[] = [];

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService,
    private dataSharingService : DataSharingService) {}


  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
  
    this.technicalStaff = this.dataSharingService.getTechnicalStaff();
  
  }

  saveTechnicalStaff() {
    // Bu yöntemi çağırarak form verilerini kaydedebilirsiniz.
    // Verileri uygun bir şekilde işleyebilirsiniz.
    console.log('Clicked Save:');
    const editedTechnicalStaff = {
      name : this.technicalStaff.name,
      surname : this.technicalStaff.surname,
      email : this.technicalStaff.email
    }

    this.requestService.editTechnicalStaff(this.technicalStaff.id.toString(), editedTechnicalStaff ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 200){
          this.message = "Technical staff has been successfully edited.";
          this.addMessage(this.message);
        }
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
          this.removeMessage(this.message);
        }, 5000);
      },
      (error) => { 
        if(error.status == 400){
          this.errorMessage = "Technical staff could not be edited.";
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

  logout(){ //çalışmıyo?
    this.authService.logout();

  }


}
