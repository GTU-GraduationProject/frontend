import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/general-admin/general-admin-manage-products/general-admin-manage-products.component';
import { BehaviorSubject } from 'rxjs';
import { ListProduct } from 'src/app/model/list-product';
import { RequestService } from 'src/app/service/request-service.service';
import { NewItem } from 'src/app/model/new-item';
import { HttpResponse } from '@angular/common/http';
import { ListPost } from 'src/app/model/list-post';
import { LocalAdmins } from 'src/app/general-admin/general-admin-manage-local-admins/general-admin-manage-local-admins.component';

const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-technical-staff-training',
  templateUrl: './technical-staff-training.component.html',
  styleUrls: ['./technical-staff-training.component.scss']
})
export class TechnicalStaffTrainingComponent implements OnInit{
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  message : string = "";
  errorMessage : string = "";
  fileMessage : string = "";
  fileErrorMessage : string = "";

  timeoutID: ReturnType<typeof setTimeout> | undefined;
  timeoutID_photo: ReturnType<typeof setTimeout> | undefined;

  selectedFile: File | null = null;
  selectedFileData: string | null = null;

  selectedFileName : string = "";

  errorMessages: string[] = [];
  messages: string[] = [];

  selectedProductID : number = 0 ;

  products: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>([]); 

  item : NewItem = {
    itemName : "",
    itemTotalAmount : 0,
    photosZip : [],
    branchId : 0,
    productId : 0,

  }
  userId : number  = 0;
  

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService : RequestService) { 
    this.userId = parseInt(localStorage.getItem('userId')!, 10);
  }

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();    
    this.getLocalAdmins();
    this.getProducts();
    this.getBranchId();
    
 
  }

  
  getLocalAdmins(){

    this.requestService.listLocalAdminsWithNoBrands().subscribe((response: ListPost[]) => {
      // console.log(response);
      if (response) {
        response.forEach((item: ListPost) => {
          // console.log(item.name, item.surname)
          const localAdmin: LocalAdmins = {  
            id : item.userId,
            name : item.name,
            surname : item.surname,
            brandName: item.brandName,
            brandId : item.brandId,
            email: item.email
          };
         
        })
        
      }
    });
    // console.log(this.localAdmins); //?
  }

  getProducts(){
    console.warn("product isteği")
    this.requestService.listProducts().subscribe((response: ListProduct[]) => {
      console.log(response);
      if (response) {
        response.forEach((item: ListProduct) => {
          console.log(item.productId, item.productName, item.productOwnerId,item.productOwnerName,item.productOwnerSurname)
          const product: Products = {  
            productId :  item.productId,
            productName :  item.productName,
            productLogo :  item.productLogo,
            productOwnerId:  item.productOwnerId,
            productOwnerName :  item.productOwnerName,
            productOwnerSurname:  item.productOwnerSurname

          };
          const updatedProductOwner = this.products.getValue().concat(product);
          this.products.next(updatedProductOwner);
        })
        
      }
    });

    //hepsi beyaz? biraz koyu ya da açık belki idk
    console.log(this.products); //?
  }

  
  getBranchId(){
    this.requestService.getBrancIdOfTechnicalStaff(this.userId).subscribe((response: {branchId: number }) => {
      
      console.log(response);
      if (response) {
        this.item.branchId = response.branchId;
        console.warn(this.item.branchId);
      }
    
    });

    console.log(this.item.branchId); //?
  }

  addItem(){
    this.item.productId = this.selectedProductID;
    console.log(this.item);
    
    this.requestService.addItem(this.item).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 201){
          this.message = "Item has been successfully added.";
          this.products.next([]);
          this.getProducts();
          this.selectedProductID = 0;
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
          this.errorMessage = "Item could not be added.";
          // if(error.error == "Invalid request: The item admin already has a brand!"){
          //   this.errorMessage = "Brand could not be added. The local admin already has a brand!";
            
          // }
          // else if(error.error == "Invalid request: Brand already exists!"){
          //   this.errorMessage = "Brand could not be added. Brand already exists!";
           
          // }
          // else{
          //   this.errorMessage = "Item could not be added.";
       
          // }
          
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
    this.resetFileErrorMessage();
  }

  removeMessage(message: string) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
    this.resetMessage();
    this.resetFileMessage();
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


  resetFileMessage(){
    this.fileMessage="";
  }

  resetFileErrorMessage(){
    this.fileMessage="";
  }
  

  onFileSelected(event: any) {



    const file: File = event.target.files[0];
   // console.log("Selected file:", file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log("File loaded successfully");

      this.selectedFile = file;
      const arrayBuffer = e.target.result;
      const byteArray = new Uint8Array(arrayBuffer);
      const hexString = Array.from(byteArray, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
      this.item.photosZip = [hexString];
      // this.item.photosZip = [byteArray];
      console.warn(this.item.photosZip);

      this.fileMessage = "File was uploaded successfully.";
      this.addMessage(this.fileMessage);
      console.log(this.fileMessage);
      if (this.timeoutID_photo) {
        clearTimeout(this.timeoutID_photo);
      }

      this.timeoutID_photo = setTimeout(() => {
        this.removeMessage(this.fileMessage);
      }, MESSAGE_TIMEOUT);
    };
    reader.onerror = (error) => {
      console.log("Error while loading file:", error);

      this.fileErrorMessage = "Error while uploading file. Please try again.";
      this.addMessage(this.fileErrorMessage);
      console.log(this.fileErrorMessage);
      if (this.timeoutID_photo) {
        clearTimeout(this.timeoutID_photo);
      }

      if (this.timeoutID_photo) {
        clearTimeout(this.timeoutID_photo);
      }

      this.timeoutID_photo = setTimeout(() => {
        this.removeErrorMessage(this.fileErrorMessage);
      }, MESSAGE_TIMEOUT);

   
    };
    reader.readAsArrayBuffer(file);
  
  
   
  }

}


