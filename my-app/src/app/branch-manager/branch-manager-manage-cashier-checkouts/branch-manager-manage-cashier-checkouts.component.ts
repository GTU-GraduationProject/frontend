import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListCashierCheckout } from 'src/app/model/list-cashier-checkout';
import { RequestService } from 'src/app/service/request-service.service';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';


const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-branch-manager-manage-cashier-checkouts',
  templateUrl: './branch-manager-manage-cashier-checkouts.component.html',
  styleUrls: ['./branch-manager-manage-cashier-checkouts.component.scss']
})
export class BranchManagerManageCashierCheckoutsComponent implements OnInit{
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  cashierCheckouts: BehaviorSubject<CashierCheckouts[]> = new BehaviorSubject<CashierCheckouts[]>([]); 
  displayedColumns: string[] = ['id', 'name', 'actions'];

  
  message : string = "";
  errorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;

  errorMessages: string[] = [];
  messages: string[] = [];


  currentPage: number = 1; // Current page number
  pageSize: number = 10; // Number of items to display per page

  userId : number = 0;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService,
    private dataSharingService : DataSharingService) {

      this.userId = parseInt(localStorage.getItem('userId')!, 10);
     
    }

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();
    this.userId = parseInt(localStorage.getItem('userId')!, 10);
     
    this.getCashierCheckouts();
 
  }
 

  getCashierCheckouts(){
    this.cashierCheckouts.next([]);
    this.requestService.listCashierCheckouts(this.userId).subscribe((response: ListCashierCheckout[]) => {
      console.log(response);
      if (response) {
        response.forEach((item: ListCashierCheckout) => {
        //  console.log(item.userId, item.name, item.surname,item.brandId,item.brandName)
          const cashierCheckout: CashierCheckouts = {  
            cashierCheckoutId : item.cashierCheckoutId,
            cameraId : item.cameraId,
            cashierId : item.cashierId,
            cashierName: item.cashierName,
            cashierSurname : item.cashierSurname
          };
          const updatedCashierCheckout = this.cashierCheckouts.getValue().concat(cashierCheckout);
          this.cashierCheckouts.next(updatedCashierCheckout);
        })
        
      }
    });
  //  console.log(this.cashierCheckouts); 
  }

  addCashierCheckout(){
    this.router.navigate(['/branch-manager/add-cashier-checkout']);
  }

  editCashierCheckout(cashierCheckout: any) {
    console.log('Edit cashierCheckout:', cashierCheckout);
    if(cashierCheckout){
      this.dataSharingService.setCashierCheckout(cashierCheckout);
      this.router.navigate(['/branch-manager/edit-cashier-checkout']);
    }

    
  }

  deleteCashierCheckout(cashierCheckout: any) {
    console.log('Delete cashierCheckout:', cashierCheckout);
    if(cashierCheckout){

      this.requestService.deleteCashierCheckout(cashierCheckout.id).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Cashier checkout has been successfully deleted.";
          }

          this.message = "Cashier checkout has been successfully deleted.";
          this.addMessage(this.message);
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
  
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.cashierCheckouts.getValue();
          const updatedData = currentData.filter(checkout => checkout.cashierCheckoutId !== cashierCheckout.cashierCheckoutId);
          this.cashierCheckouts.next(updatedData);
        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Cashier checkout could not be deleted.";
          }
          else {
            this.errorMessage = "An unknown error has occurred.";
          }
          this.addErrorMessage(this.errorMessage)
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
  getPage(page: number, pageSize: number): CashierCheckouts[] {
    const allData = this.cashierCheckouts.value; 
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

export class CashierCheckouts{
  cashierCheckoutId : number = 0;
  cameraId : string = "";
  cashierId : number = 0;
  cashierName : string = "";
  cashierSurname : string = "";
  
}