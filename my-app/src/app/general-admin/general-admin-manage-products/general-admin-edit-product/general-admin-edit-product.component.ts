import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { ListRequest } from 'src/app/model/list-request';
import { BehaviorSubject } from 'rxjs';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { HttpResponse } from '@angular/common/http';
import { Products } from '../general-admin-manage-products.component';
import { ListProductOwner } from 'src/app/model/list-product-owner';
import { ProductOwners } from '../../general-admin-manage-product-owners/general-admin-manage-product-owners.component';


const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-general-admin-edit-product',
  templateUrl: './general-admin-edit-product.component.html',
  styleUrls: ['./general-admin-edit-product.component.scss']
})
export class GeneralAdminEditProductComponent implements OnInit {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";
  product : Products = {
    productId :  0,
    productName :  "",
    productLogo :  "",
    productOwnerId:  0,
    productOwnerName :  "",
    productOwnerSurname:  ""
  };
  productOwners: BehaviorSubject<ProductOwners[]> = new BehaviorSubject<ProductOwners[]>([]); 
 
  message : string = "";
  errorMessage : string = "";
  photoMessage : string = "";
  photoErrorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;
  timeoutID_photo: ReturnType<typeof setTimeout> | undefined;

  selectedFile: File | null = null;
  selectedFileData: string | null = null;

  selectedFileName : string = "";

  errorMessages: string[] = [];
  messages: string[] = [];

  selectedProductOwnerId : number = 0 ;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService,
    private dataSharingService : DataSharingService) {}

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();   
    this.product = this.dataSharingService.getProduct();
    this.getProductOwners();
 
  }

  getProductOwners(){

    this.productOwners.next([]);
    this.requestService.listProductOwnersWithNoProducts().subscribe((response: ListProductOwner[]) => {
      console.log(response);
      if (response) {
        response.forEach((item: ListProductOwner) => {
          console.log(item.userId, item.name, item.surname,item.productId,item.productName)
          const productOwner: ProductOwners = {  
            id : item.userId,
            name : item.name,
            surname : item.surname,
            productName: item.productName,
            productId : item.productId,
            productLogo : item.productLogo,
            email: item.email

          };
          const updatedProductOwner = this.productOwners.getValue().concat(productOwner);
          this.productOwners.next(updatedProductOwner);
        })
        
      }
    });
    console.log(this.productOwners); 
  }

  
  saveProduct() {
   
   // console.log('Clicked Save:');

    const editedProduct = {
      productName : this.product.productName,
      productOwnerId : this.selectedProductOwnerId,
      productLogo : this.product.productLogo
    }

    console.log(editedProduct);
    console.log(this.product.productId.toString());

    this.requestService.editProduct(this.product.productId.toString(), editedProduct ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 200){
          this.message = "Product has been successfully edited.";
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
          this.errorMessage = "Product could not be edited.";
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


  onFileSelected(event: any) {



    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = file;
      this.selectedFileData = reader.result as string;
      this.selectedFileName = file.name;
      this.product.productLogo = this.selectedFileData;
      this.photoMessage = "Photo was uploaded successfully.";
      this.addMessage(this.photoMessage);
      console.log(this.photoMessage);
      if (this.timeoutID_photo) {
        clearTimeout(this.timeoutID_photo);
      }

      this.timeoutID_photo = setTimeout(() => {
        this.removeMessage(this.photoMessage);
      }, MESSAGE_TIMEOUT);

    };
    reader.onerror = (error) => {
      this.photoErrorMessage = "Error while uploading photo. Please try again.";
      this.addMessage(this.photoErrorMessage);
      console.log(this.photoErrorMessage);
      if (this.timeoutID_photo) {
        clearTimeout(this.timeoutID_photo);
      }

      if (this.timeoutID_photo) {
        clearTimeout(this.timeoutID_photo);
      }

      this.timeoutID_photo = setTimeout(() => {
        this.removeErrorMessage(this.photoErrorMessage);
      }, MESSAGE_TIMEOUT);

   
    };
    reader.readAsDataURL(file);

   
  }


}
