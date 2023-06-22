import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { HttpResponse } from '@angular/common/http';
import { LocalAdmins } from '../../general-admin-manage-local-admins/general-admin-manage-local-admins.component';
import { BehaviorSubject } from 'rxjs';
import { ListPost } from 'src/app/model/list-post';
import { ListRequest } from 'src/app/model/list-request';


const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-general-admin-add-brand',
  templateUrl: './general-admin-add-brand.component.html',
  styleUrls: ['./general-admin-add-brand.component.scss']
})


export class GeneralAdminAddBrandComponent implements OnInit {
  brand  = {
    brandName : "",
    localAdminId : 0,
    brandLogo : ""
  };

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

  selectedLocalAdminId : number = 0 ;

  localAdmins: BehaviorSubject<LocalAdmins[]> = new BehaviorSubject<LocalAdmins[]>([]); 

  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService) {}

  ngOnInit(): void {
    this.getLocalAdmins();
  }

  getLocalAdmins(){
    this.localAdmins.next([]);
    const req : ListRequest = {  }
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
    // console.log(this.localAdmins); //?
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


  addBrand(){
    // console.log('Clicked Save:');
    // console.log('Brand Name:', this.brand.brandName);
    this.brand.localAdminId = this.selectedLocalAdminId as number;
    // console.log('Local Admin Id:', this.brand.localAdminId);
    // console.log('Brand Logo:', this.brand.brandLogo);


    console.log(this.brand);


    this.requestService.addBrand(this.brand).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 201){
          this.message = "Brand has been successfully added.";
          this.localAdmins.next([]);
          this.getLocalAdmins();
          this.selectedLocalAdminId = 0;
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
          if(error.error == "Invalid request: The local admin already has a brand!"){
            this.errorMessage = "Brand could not be added. The local admin already has a brand!";
            
          }
          else if(error.error == "Invalid request: Brand already exists!"){
            this.errorMessage = "Brand could not be added. Brand already exists!";
           
          }
          else{
            this.errorMessage = "Brand could not be added.";
       
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

 

  onFileSelected(event: any) {



    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = file;
      this.selectedFileData = reader.result as string;
      this.selectedFileName = file.name;
      this.brand.brandLogo = reader.result as string;
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

}
