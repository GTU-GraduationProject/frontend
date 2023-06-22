import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ListRequest } from 'src/app/model/list-request';
import { ListBrandPost } from 'src/app/model/list-brand-post';
import { RequestService } from 'src/app/service/request-service.service';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { HttpResponse } from '@angular/common/http';

const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-general-admin-manage-brands',
  templateUrl: './general-admin-manage-brands.component.html',
  styleUrls: ['./general-admin-manage-brands.component.scss']
})
export class GeneralAdminManageBrandsComponent implements OnInit  {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  brands: BehaviorSubject<Brands[]> = new BehaviorSubject<Brands[]>([]); 

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
    this.getBrands();
  }



  getBrands(){
    this.brands.next([]);
    this.requestService.listBrands().subscribe((response: ListBrandPost[]) => {
      //console.log(response);
      if (response) {
        response.forEach((item: ListBrandPost) => {
          //console.log(item.brandId, item.brandName, item.brandLogo,item.localAdminId,item.localAdminName,item.localAdminSurname)
          const brand: Brands = {  
            brandId : item.brandId,
            brandName : item.brandName,
            brandLogo : item.brandLogo,
            localAdminId : item.localAdminId,
            localAdminName: item.localAdminName,
            localAdminSurname: item.localAdminSurname

          };
          const updatedBrand = this.brands.getValue().concat(brand);
          this.brands.next(updatedBrand);
        })
        
      }
    });
  }
  logout(){
    this.authService.logout();

  }


  getPage(page: number, pageSize: number): Brands[] {
    const allData = this.brands.value; 
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex); 
  }

  addBrand(){
    //console.warn("add brand button clicked");
    this.router.navigate(['/general-admin/add-brand']);
  
  }

  editBrand(brand: any) {
    //console.log('Edit brand:', brand);
    if(brand){
      this.dataSharingService.setBrandData(brand)
      this.router.navigate(['/general-admin/edit-brand']);
    }

    
  }


  deleteBrand(brand: any) {
    //console.log('Delete brand:', brand);
    if(brand){

      this.requestService.deleteBrand(brand.brandId).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Response status:', response.status);
          if(response.status == 200){ //yok!
            this.message = "Brand has been successfully deleted.";
          }

          this.message = "Brand has been successfully deleted.";
          this.addMessage(this.message);
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }
  
          this.timeoutID = setTimeout(() => {
            this.removeMessage(this.message);
          }, 5000);

          const currentData = this.brands.getValue();
          const updatedData = currentData.filter(brand_ => brand_.brandId !== brand.brandId);
          this.brands.next(updatedData);
        },
        (error) => { 
          if(error.status == 400){
            this.errorMessage = "Brand could not be deleted.";
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


export class Brands{
  brandId: number = 0;
  brandName: string = "";
  brandLogo: string = "";
  localAdminId: number = 0;
  localAdminName: string = "";
  localAdminSurname: string = "";
  
}