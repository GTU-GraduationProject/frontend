import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { User } from 'src/app/model/user';
import { HttpResponse } from '@angular/common/http';
import { NewCashierCheckout } from 'src/app/model/new-cashier-checkout';
import { Cashiers } from '../../branch-manager-manage-cashiers/branch-manager-manage-cashiers.component';
import { BehaviorSubject } from 'rxjs';
import { ListCashier } from 'src/app/model/list-cashier';

const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-branch-manager-add-cashier',
  templateUrl: './branch-manager-add-cashier.component.html',
  styleUrls: ['./branch-manager-add-cashier.component.scss']
})
export class BranchManagerAddCashierComponent  {


  cashier : User = {
    name : "",
    surname : "",
    password : "",
    email: ""
  };

  message : string = "";
  errorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;

  errorMessages: string[] = [];
  messages: string[] = [];

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService) {}

  addCashier(){
    // console.log('Clicked Save:');
    // console.log('Name:', this.localAdmin.name);
    // console.log('Surname:', this.localAdmin.surname);
    // console.log('E-mail:', this.localAdmin.email);

    this.requestService.addLocalAdmin(this.cashier).subscribe(
      (response: HttpResponse<any>) => {
       // console.log('Response status:', response.status);
        if(response.status == 201){
          this.message = "Cashier has been successfully added.";
        }
        this.addMessage(this.message)
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
          this.removeMessage(this.message);
        }, 5000);
      },
      (error) => { 
        if(error.status == 400){
          this.errorMessage = "Cashier could not be added.";
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
