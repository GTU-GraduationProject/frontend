import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ListProduct } from 'src/app/model/list-product';
import { ListRequest } from 'src/app/model/list-request';
import { AuthService } from 'src/app/service/auth-service.service';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { RequestService } from 'src/app/service/request-service.service';

const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-general-admin-manage-products',
  templateUrl: './general-admin-manage-products.component.html',
  styleUrls: ['./general-admin-manage-products.component.scss']
})
export class GeneralAdminManageProductsComponent {
  
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  products: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>([]); 
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
   
    this.getProducts();
 
  }


  addProduct(){
    //console.warn("add products button clicked");
    this.router.navigate(['/general-admin/add-product']);
  
  }

  getProducts(){

    this.products.next([]);
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

    console.log(this.products); 
  }

  getPage(page: number, pageSize: number): Products[] {
    const allData = this.products.value; 
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex); 
  }

  editProduct(product: any) {
   // console.log('Edit product:', product);
    if(product){
      this.dataSharingService.setProduct(product);
      this.router.navigate(['/general-admin/edit-product']);
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

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  deleteProduct(product: any) {
    console.log('Delete product owner:', product);
    if(product){

      this.requestService.deleteProduct(product.productId).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Product has been successfully deleted.";
          }

          this.message = "Product has been successfully deleted.";
          this.addMessage(this.message);
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
  
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.products.getValue();
          const updatedData = currentData.filter(product_ => product_.productId !== product.productId);
          this.products.next(updatedData);
        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Product could not be deleted.";
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

export class Products{
  productId : number = 0;
  productName : string = "";
  productLogo : string = "";
  productOwnerId: number = 0;
  productOwnerName : string = "";
  productOwnerSurname: string = "";  


}
