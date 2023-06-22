import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { ListRequest } from 'src/app/model/list-request';
import { BehaviorSubject } from 'rxjs';
import { ListBrandPost } from 'src/app/model/list-brand-post';
import { ProductOwners } from '../general-admin-manage-product-owners.component';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { HttpResponse } from '@angular/common/http';

const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-general-admin-edit-product-owner',
  templateUrl: './general-admin-edit-product-owner.component.html',
  styleUrls: ['./general-admin-edit-product-owner.component.scss']
})
export class GeneralAdminEditProductOwnerComponent implements OnInit  {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";
  productOwner : ProductOwners = {
    id : 0,
    name : "",
    surname : "",
    productName: "",
    productId : 0,
    productLogo : "",
    email: ""
  };

  productOwner_copy : ProductOwners = {
    id : 0,
    name : "",
    surname : "",
    productName: "",
    productId : 0,
    productLogo : "",
    email: ""
  };

  productOwnerName: string = "";
  productOwnerSurname: string = "";
  productName: string = "";
  productLogo: string = "";


  
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

    this.productOwner = this.dataSharingService.getProductOwner();
    this.productOwner_copy = this.productOwner;
    
  }
  
  checkInputValue(){
    if (!this.productOwner.name || this.productOwner.name.trim() === '') {
      this.productOwner.name = this.productOwner_copy.name;
    }
    if (!this.productOwner.surname || this.productOwner.surname.trim() === '') {
      this.productOwner.surname = this.productOwner_copy.surname;
    }
    if (!this.productOwner.email || this.productOwner.email.trim() === '') {
      this.productOwner.email = this.productOwner_copy.email;
    }
  }

  saveProductOwner() {
    this.checkInputValue();
   // console.log('Clicked Save:');

    const editedProductOwner = {
      name : this.productOwner.name,
      surname : this.productOwner.surname,
      email : this.productOwner.email
    }

    this.requestService.editProductOwner(this.productOwner.id.toString(), editedProductOwner ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 200){
          this.message = "Product owner has been successfully edited.";
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
          this.errorMessage = "Product owner could not be edited.";
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
