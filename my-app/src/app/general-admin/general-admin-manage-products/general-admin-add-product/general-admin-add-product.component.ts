import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Products } from '../general-admin-manage-products.component';
import { ProductOwners } from '../../general-admin-manage-product-owners/general-admin-manage-product-owners.component';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { ListRequest } from 'src/app/model/list-request';
import { ListProductOwner } from 'src/app/model/list-product-owner';
import { HttpResponse } from '@angular/common/http';
import { RequestService } from 'src/app/service/request-service.service';
import { NewProduct } from 'src/app/model/new-product';


const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-general-admin-add-product',
  templateUrl: './general-admin-add-product.component.html',
  styleUrls: ['./general-admin-add-product.component.scss']
})

export class GeneralAdminAddProductComponent implements OnInit {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";
  product : NewProduct = {
    productName :  "",
    productOwnerId:  0,
    productLogo :  ""
    
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
    

    this.getProductOwners();
  
  }

  getProductOwners(){

    this.productOwners.next([]);
    this.requestService.listProductOwnersWithNoProducts().subscribe((response: ListProductOwner[]) => {
    //  console.log(response);
      if (response) {
        response.forEach((item: ListProductOwner) => {
          //console.log(item.userId, item.name, item.surname,item.productId,item.productName)
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
   // console.log(this.productOwners); 
  }

  addProduct(){
    // this.uploadFile();
   // console.log('Clicked Save:');
    this.product.productOwnerId = this.selectedProductOwnerId as number;


    this.requestService.addProduct(this.product).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 201){
          this.message = "Product has been successfully added.";
          this.productOwners.next([]);
          this.getProductOwners();
          this.selectedProductOwnerId = 0;
          this.addMessage( this.message);          
        }
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
          this.removeMessage(this.message);
        }, MESSAGE_TIMEOUT);
      },
      (error) => { 
        console.log(error.error)
        if(error.status == 400){
          if(error.error == "Invalid request: The product owner already has a product!"){
            this.errorMessage = "Product could not be added. The product owner already has a product!";
            
          }
          else if(error.error == "Invalid request: Product already exists!"){
            this.errorMessage = "Product could not be added. Product already exists!";
           
          }
          else{
            this.errorMessage = "Product could not be added.";
       
          }
          
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
        }, MESSAGE_TIMEOUT);

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
      this.product.productLogo = this.selectedFileData;
      this.selectedFileName = file.name;
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

  // uploadFile() {
  //   if (this.selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.product.productLogo = reader.result as string;
  //       console.log(this.product.productLogo);
       
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }

}
