import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { LocalAdmins } from '../general-admin-manage-local-admins.component';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { HttpResponse } from '@angular/common/http';

const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-general-admin-edit-local-admin',
  templateUrl: './general-admin-edit-local-admin.component.html',
  styleUrls: ['./general-admin-edit-local-admin.component.scss']
})
export class GeneralAdminEditLocalAdminComponent implements OnInit {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";
  localAdmin : LocalAdmins = {
    id : 0,
    name : "",
    surname : "",
    brandName: "",
    brandId : 0,
    email: ""
  };


  localAdminName: string = "";
  localAdminSurname: string = "";
  brandName: string = "";

  
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

    this.localAdmin = this.dataSharingService.getLocalAdmin();

  }




  saveLocalAdmin() {
    
    //console.log('Clicked Save:');
    const editedLocalAdmin = {
      name : this.localAdmin.name,
      surname : this.localAdmin.surname,
      email : this.localAdmin.email
    }

    this.requestService.editLocalAdmin(this.localAdmin.id.toString(), editedLocalAdmin ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 200){
          this.message = "Local admin has been successfully edited.";
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
          this.errorMessage = "Local admin could not be edited.";
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


}
