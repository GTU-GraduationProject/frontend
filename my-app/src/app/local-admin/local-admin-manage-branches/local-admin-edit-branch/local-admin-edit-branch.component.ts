import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request-service.service';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BranchManagers } from '../../local-admin-manage-branch-managers/local-admin-manage-branch-managers.component';
import { TechnicalStaffs } from '../../local-admin-manage-technical-staffs/local-admin-manage-technical-staffs.component';
import { Branches } from '../local-admin-manage-branches.component';
import { EditBranch } from 'src/app/model/edit-branch';
import { ListBranchManagers } from 'src/app/model/list-branch-managers';
import { ListTechnicalStaffs } from 'src/app/model/list-technical-staffs';


const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-local-admin-edit-branch',
  templateUrl: './local-admin-edit-branch.component.html',
  styleUrls: ['./local-admin-edit-branch.component.scss']
})
export class LocalAdminEditBranchComponent implements OnInit {
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";

  branch : Branches = {
    brandId :  0,
    brandName :  "",
    brandLogo :  "",
    branchId:  0,
    branchName:  "",
    branchManagerId :  0,
    branchManagerName:  "",
    branchManagerSurname :  ""
  }


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

  selectedTechnicalStaffId : number = 0 ;
  selectedBranchManagerId : number = 0;

  branchManagers: BehaviorSubject<BranchManagers[]> = new BehaviorSubject<BranchManagers[]>([]); 
  technicalStaffs : BehaviorSubject<TechnicalStaffs[]> = new BehaviorSubject<TechnicalStaffs[]>([]); 

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService) {}

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();

    this.getTechnicalStaffs();
    this.getBranchManagers();
  }

  getTechnicalStaffs(){
    this.technicalStaffs.next([]);
    this.requestService.listTechnicalStaffWithNoBranch().subscribe((response: ListTechnicalStaffs[]) => {
     // console.log(response);
      if (response) {
        response.forEach((item: ListTechnicalStaffs) => {
          //console.log(item.userId, item.name, item.surname,item.brandId,item.brandName)
          const technicalStaff: TechnicalStaffs = {  
            id : item.userId,
            name : item.name,
            surname : item.surname,
            brandName: item.brandName,
            brandId : item.brandId,
            email: item.email,
            branchName: item.branchName,
            branchId : item.branchId
          };
          const updatedTechnicalStaff = this.technicalStaffs.getValue().concat(technicalStaff);
          this.technicalStaffs.next(updatedTechnicalStaff);
        })
        
      }
    });
   // console.log(this.technicalStaffs); 
  }

  getBranchManagers(){
    this.branchManagers.next([]);
    this.requestService.listBranchManagerWithNoBranch().subscribe((response: ListBranchManagers[]) => {
     // console.log(response);
      if (response) {
        response.forEach((item: ListBranchManagers) => {
          //console.log(item.userId, item.name, item.surname,item.brandId,item.brandName)
          const branchManager: BranchManagers = {  
            id : item.userId,
            name : item.name,
            surname : item.surname,
            brandName: item.brandName,
            brandId : item.brandId,
            email: item.email,
            branchName: item.branchName,
            branchId : item.branchId
          };
          const updatedBranchManagers = this.branchManagers.getValue().concat(branchManager);
          this.technicalStaffs.next(updatedBranchManagers);
        })
        
      }
    });
   // console.log(this.technicalStaffs); 
  }

  saveBranch(){
    if(this.selectedBranchManagerId == 0){
      this.selectedBranchManagerId = this.branch.branchManagerId;
    }
    //else technical
    const editedBranch = {
      branchName : this.branch.branchName,
      branchManagerId : this.selectedBranchManagerId,
      technicalStaffId : this.selectedTechnicalStaffId,
      // branchId : this.branch.branchId,
      // branchName : this.branch.branchName,
      // branchManagerId : this.branch.branchManagerId,
      // branchManagerName : this.branch.branchManagerName,
      // branchManagerSurname : this.branch.branchManagerSurname

    }

    this.requestService.editBranch(this.branch.brandId.toString(), editedBranch ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response status:', response.status);
        if(response.status == 200){
          this.message = "Branch has been successfully edited.";
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
          this.errorMessage = "Branch could not be edited.";
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
