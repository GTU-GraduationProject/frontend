import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from 'src/app/service/request-service.service';
import { ListCashier } from 'src/app/model/list-cashier';
import { HttpResponse } from '@angular/common/http';

const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-branch-manager-manage-cashiers',
  templateUrl: './branch-manager-manage-cashiers.component.html',
  styleUrls: ['./branch-manager-manage-cashiers.component.scss']
})
export class BranchManagerManageCashiersComponent implements OnInit{
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  cashiers: BehaviorSubject<Cashiers[]> = new BehaviorSubject<Cashiers[]>([]); 
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
     
 
   this.getCashiers();
 
  }



  getCashiers(){
    this.cashiers.next([]);
    this.requestService.listCashiers(this.userId).subscribe((response: ListCashier[]) => {
    //  console.log(response);
      if (response) {
        response.forEach((item: ListCashier) => {
        //  console.log(item.userId, item.name, item.surname,item.brandId,item.brandName)
          const cashier: Cashiers = {  
            id : item.userId,
            name : item.name,
            surname : item.surname,
            brandName: item.brandName,
            brandId : item.brandId,
            email: item.email,
            branchName: item.branchName,
            branchId : item.branchId,
            cashierCheckoutId : item.cashierCheckoutId
          };
          const updatedCashiers = this.cashiers.getValue().concat(cashier);
          this.cashiers.next(updatedCashiers);
        })
        
      }
    });
   // console.log(this.cashiers); 
  }

  addCashier(){
    this.router.navigate(['/branch-manager/add-cashier']);
  }

  editCashier(cashier: any) {
    console.log('Edit cashier:', cashier);
    if(cashier){
      this.dataSharingService.setCashier(cashier);
      this.router.navigate(['/branch-manager/edit-cashier']);
    }

    
  }

  deleteCashier(cashier: any) {
    console.log('Delete cashier:', cashier);
    if(cashier){

      this.requestService.deleteCashier(cashier.id).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Cashier has been successfully deleted.";
          }

          this.message = "Cashier has been successfully deleted.";
          this.addMessage(this.message)
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
  
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.cashiers.getValue();
          const updatedData = currentData.filter(cashier_ => cashier_.id !== cashier.id);
          this.cashiers.next(updatedData);
        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Cashier could not be deleted.";
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
  getPage(page: number, pageSize: number): Cashiers[] {
    const allData = this.cashiers.value; 
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


export class Cashiers{
  id : number = 0;
  name : string = "";
  surname : string = "";
  email: string = "";
  brandName: string = "";
  brandId : number = 0;
  branchName: string = "";
  branchId : number = 0;
  cashierCheckoutId : number = 0;
  
}