import { Component, NgZone, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { ListRequest } from 'src/app/model/list-request';
import { BehaviorSubject } from 'rxjs';
import { ListBrandPost } from 'src/app/model/list-brand-post';
import { Brands } from '../general-admin-manage-brands.component';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from "ng-apexcharts";
import { LocalAdmins } from '../../general-admin-manage-local-admins/general-admin-manage-local-admins.component';
import { ListPost } from 'src/app/model/list-post';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { HttpResponse } from '@angular/common/http';

const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-general-admin-edit-brand',
  templateUrl: './general-admin-edit-brand.component.html',
  styleUrls: ['./general-admin-edit-brand.component.scss']
})



export class GeneralAdminEditBrandComponent implements OnInit {
  
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";
  brand : Brands = {
    brandId : 0,
    brandName : "",
    brandLogo : "",
    localAdminId : 0,
    localAdminName : "",
    localAdminSurname : "",
  };

  message : string = "";
  errorMessage : string = "";
  photoMessage : string = "";
  photoErrorMessage : string = "";

  errorMessages: string[] = [];
  messages: string[] = [];

  selectedFile: File | null = null;
  selectedFileData: string | null = null;

  selectedFileName : string = "";


  
  timeoutID: ReturnType<typeof setTimeout> | undefined;
  timeoutID_photo: ReturnType<typeof setTimeout> | undefined;

  selectedLocalAdminId : number = 0 ;

  localAdmins: BehaviorSubject<LocalAdmins[]> = new BehaviorSubject<LocalAdmins[]>([]); 
  
  
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService,
    private dataSharingService : DataSharingService ) { }
        
  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();

    this.brand = this.dataSharingService.getBrandData();

   
    this.getLocalAdmins();
    
  }
        
  getLocalAdmins(){
          
    this.localAdmins.next([]);
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
          const updatedLocalAdmins = this.localAdmins.getValue().concat(localAdmin);
          this.localAdmins.next(updatedLocalAdmins);
        })
        
      }
    });
    // console.log(this.localAdmins); 
  }
  
  saveBrand(){
    const editedBrand = {
      brandName : this.brand.brandName,
      brandLogo : this.brand.brandLogo,
      localAdminId : this.selectedLocalAdminId
    }

    this.requestService.editBrand(this.brand.brandId.toString(), editedBrand ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 200){
          this.message = "Brand has been successfully edited.";
        }
        this.addMessage(this.message);
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
          this.removeMessage(this.message);
        }, 5000);
      },
      (error) => { 
        if(error.status == 400){
          this.errorMessage = "Brand could not be edited.";
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

  onFileSelected(event: any) {
  
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = file;
      this.selectedFileData = reader.result as string;
      this.selectedFileName = file.name;
      this.photoMessage = "Photo was uploaded successfully.";
      this.brand.brandLogo = this.selectedFileData;
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
    console.error(this.brand.brandLogo)
   
  }

  uploadFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.brand.brandLogo = reader.result as string;
        console.log(this.brand.brandLogo);
       
      };
      reader.readAsDataURL(this.selectedFile);
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
    this.resetPhotoErrorMessage();
  }

  removeMessage(message: string) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
    this.resetMessage();
    this.resetPhotoMessage();
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


  resetPhotoMessage(){
    this.photoMessage="";
  }

  resetPhotoErrorMessage(){
    this.photoErrorMessage="";
  }


}
