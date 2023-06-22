import { Component, OnInit } from '@angular/core';
import { BranchInfo } from '../product-owner-dashboard/product-owner-dashboard.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { ListRequest } from 'src/app/model/list-request';
import { ListPost } from 'src/app/model/list-post';
import { ListProductOwner } from 'src/app/model/list-product-owner';
import { RequestService } from 'src/app/service/request-service.service';
import { HttpResponse } from '@angular/common/http';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { TopTenBranches } from 'src/app/model/top-ten-branches';


const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-product-owner-branch-statistics',
  templateUrl: './product-owner-branch-statistics.component.html',
  styleUrls: ['./product-owner-branch-statistics.component.scss']
})
export class ProductOwnerBranchStatisticsComponent {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  branches: BehaviorSubject<BranchInfo[]> = new BehaviorSubject<BranchInfo[]>([]); 
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
      
    //  console.log(response);
      if (response) {
        this.productID = response.productId;
        this.getBranches();
        

      }
    
    });

  //  console.log(this.productID); 
  }

  getBranches(){
  //  console.log(this.productID)
    this.requestService.getAllBranches(this.productID).subscribe((response: { topTenBranches: TopTenBranches[] }) => {
    //  console.log(response);
      if (response) {
        this.branches.next([]); 
        response.topTenBranches.forEach((item: TopTenBranches) => {
          const branchInfo: BranchInfo = {  
            topTotalAmount : item.topTotalAmount,
            topTotalRemainingAmount : item.topTotalRemainingAmount,
            topTotalSoldAmount : item.topTotalSoldAmount,
            isReported : item.isReported,
            productId : item.productId,
            productName : item.productName,   
            productLogo : item.productLogo,  
            productOwnerId : item.productOwnerId,
            productOwnerName : item.productOwnerName,       
            productOwnerSurname : item.productOwnerSurname,
            branchId : item.branchId,
            branchName : item.branchName,   
            brandId : item.brandId,
            brandName : item.brandName
          };
          
          const updatedInfos = this.branches.getValue().concat(branchInfo);
          this.branches.next(updatedInfos);
          
        })
      }
    });
  }

  getPage(page: number, pageSize: number): BranchInfo[] {
    const allData = this.branches.value; 
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
