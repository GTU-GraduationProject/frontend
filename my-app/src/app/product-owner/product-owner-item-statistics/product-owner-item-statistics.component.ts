import { Component, OnInit } from '@angular/core';
import { BranchInfo, ItemInfo } from '../product-owner-dashboard/product-owner-dashboard.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { ListRequest } from 'src/app/model/list-request';
import { ListPost } from 'src/app/model/list-post';
import { ListProductOwner } from 'src/app/model/list-product-owner';
import { RequestService } from 'src/app/service/request-service.service';
import { HttpResponse } from '@angular/common/http';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { TopFiveItems } from 'src/app/model/top-five-items';
import { AllItems } from 'src/app/model/all-items';

const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-product-owner-item-statistics',
  templateUrl: './product-owner-item-statistics.component.html',
  styleUrls: ['./product-owner-item-statistics.component.scss']
})
export class ProductOwnerItemStatisticsComponent {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  items: BehaviorSubject<AllItemInfo[]> = new BehaviorSubject<AllItemInfo[]>([]); 
  displayedColumns: string[] = ['id', 'name', 'actions'];

  message : string = "";
  errorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;

  errorMessages: string[] = [];
  messages: string[] = [];

  currentPage: number = 1; // Current page number
  pageSize: number = 10; // Number of items to display per page

  
  userId : number = 0;
  productID : number = 0;
  productLogo : string = "";

  

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService,
    private dataSharingService : DataSharingService) {

      this.userId = parseInt(localStorage.getItem('userId')!, 10);

    }


  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
   
    this.getProductIDOfProductOwner();
 
  }
  logout(){
    this.authService.logout();

  }

  getProductIDOfProductOwner(){
    
    this.requestService.getProductIDOfProductOwner(this.userId).subscribe((response: { productId: number }) => {
      
      console.log(response);
      if (response) {
        this.productID = response.productId;
        this.getItems();
        

      }
    
    });

    console.log(this.productID); //?
  }

  getItems(){
    this.requestService.getAllItems(this.productID).subscribe((response: { allItems: AllItems[]}) => {
      console.log(response);
      if (response) {
        this.items.next([]); 
        response.allItems.forEach((item: AllItems) => {
          const itemInfo: AllItemInfo = {  
            itemId : item.itemId,
            itemName : item.itemName,
            itemTotalAmount : item.itemTotalAmount,
            itemRemainingAmount : item.itemRemainingAmount,
            itemSoldAmount : item.itemSoldAmount,
            productId : item.productId,
            productName : item.productName,  
            productOwnerId : item.productOwnerId,
            productOwnerName : item.productOwnerName,       
            productOwnerSurname : item.productOwnerSurname,
            branchId : item.branchId,
            branchName : item.branchName,   
            brandId : item.brandId,
            brandName : item.brandName
          };
          
          const updatedInfos = this.items.getValue().concat(itemInfo);
          this.items.next(updatedInfos);
        })
      }
    });
  }

  seeDetails(product: any){
    if(product){
      this.dataSharingService.setProduct(product);
      this.router.navigate(['/product-owner/details-of-item']);
    }
  }

  getPage(page: number, pageSize: number): AllItemInfo[] {
    const allData = this.items.value; 
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex); 
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


export class AllItemInfo  {
  itemId : number = 0;
  itemName: string = "";    
  itemTotalAmount: number = 0;
  itemRemainingAmount: number = 0;
  itemSoldAmount: number = 0;
  productId: number = 0;
  productName: string = "";    
  productOwnerId: number = 0;
  productOwnerName: string = "";        
  productOwnerSurname: string = "";    
  branchId: number = 0;
  branchName: string = "";    
  brandId: number = 0;   
  brandName: string = "";    

}