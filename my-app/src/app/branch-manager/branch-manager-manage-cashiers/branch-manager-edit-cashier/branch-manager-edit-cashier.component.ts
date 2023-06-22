import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { HttpResponse } from '@angular/common/http';
import { Cashiers } from '../branch-manager-manage-cashiers.component';

const MESSAGE_TIMEOUT = 5000; 
@Component({
  selector: 'app-branch-manager-edit-cashier',
  templateUrl: './branch-manager-edit-cashier.component.html',
  styleUrls: ['./branch-manager-edit-cashier.component.scss']
})
export class BranchManagerEditCashierComponent implements OnInit {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";
  cashier : Cashiers = {
    id : 0,
    name : "",
    surname : "",
    email: "",
    brandName: "",
    brandId : 0,
    branchName: "",
    branchId : 0,
    cashierCheckoutId : 0
  };


  
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

    this.cashier = this.dataSharingService.getCashier();

  }




  saveCashier() {
    
    //console.log('Clicked Save:');
    const editedLocalAdmin = {
      name : this.cashier.name,
      surname : this.cashier.surname,
      email : this.cashier.email
    }

    this.requestService.editLocalAdmin(this.cashier.id.toString(), editedLocalAdmin ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 200){
          this.message = "Cashier has been successfully edited.";
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
          this.errorMessage = "Cashier could not be edited.";
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
