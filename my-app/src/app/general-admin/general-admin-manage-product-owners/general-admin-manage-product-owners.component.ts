import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { ListRequest } from 'src/app/model/list-request';
import { ListPost } from 'src/app/model/list-post';
import { ListProductOwner } from 'src/app/model/list-product-owner';
import { RequestService } from 'src/app/service/request-service.service';
import { HttpResponse } from '@angular/common/http';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';


const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-general-admin-manage-product-owners', 
  templateUrl: './general-admin-manage-product-owners.component.html', 
  styleUrls: ['./general-admin-manage-product-owners.component.scss']
  
})
export class GeneralAdminManageProductOwnersComponent implements OnInit  {
  
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  productOwners: BehaviorSubject<ProductOwners[]> = new BehaviorSubject<ProductOwners[]>([]); 
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
    this.getProductOwners();
 
  }


  addProductOwner(){
    console.warn("add product owner button clicked");
    this.router.navigate(['/general-admin/add-product-owner']);
  
  }

  getProductOwners(){

    const req : ListRequest = {  }
    this.requestService.listProductOwners().subscribe((response: ListProductOwner[]) => {
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

    console.log(this.productOwners); //?
  }

  getPage(page: number, pageSize: number): ProductOwners[] {
    const allData = this.productOwners.value; 
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex); 
  }
  

  editProductOwner(productOwner: any) {
    console.log('Edit product owner:', productOwner);
    if(productOwner){
      this.dataSharingService.setProductOwner(productOwner);
      this.router.navigate(['/general-admin/edit-product-owner']);
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
  // Calculate total number of pages based on items and itemsPerPage


  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  deleteProductOwner(productOwner: any) {
    console.log('Delete product owner:', productOwner);
    if(productOwner){

      this.requestService.deleteProductOwner(productOwner.id).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Product owner has been successfully deleted.";
          }

          this.message = "Product owner has been successfully deleted.";
          this.addMessage(this.message);
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
  
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.productOwners.getValue();
          const updatedData = currentData.filter(owner => owner.id !== productOwner.id);
          this.productOwners.next(updatedData);
        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Product owner could not be deleted.";
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

export class ProductOwners{
  id : number = 0;
  name : string = "";
  surname : string = "";
  productName: string = "";
  productId : number = 0;
  productLogo : string = "";
  email: string = "";  


}
