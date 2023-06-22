import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';
import { LoginRequest } from '../model/login-request';
import { LoginPost } from '../model/login-post';
import { UserRole } from '../user-role/user-role';


const MESSAGE_TIMEOUT = 5000; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  message : string = "";
  errorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;

  errorMessages: string[] = [];
  messages: string[] = [];

  constructor(private authService: AuthService, private router: Router) { }


  login(event: Event){
    
    
    const userIdInput = document.getElementById("user-id") as HTMLInputElement;
    const userId = userIdInput.value;
   // console.log("User ID: ", userId);

    const userPasswordInput = document.getElementById("password") as HTMLInputElement;
    const userPassword = userPasswordInput.value;
  //  console.log("User Password: ", userPassword);

    const req : LoginRequest = { username: userId.toString() , password: userPassword.toString() }
    
    const checkID = Number(userId);


    this.router.navigate(['/general-admin']);
    this.authService.login(req).subscribe(
      (response: LoginPost) => {        
        console.log(response);
        const role = response.role;
        console.log(role);
        if(role === UserRole.GeneralAdmin){
          localStorage.setItem('userId', userId);
          this.router.navigate(['/general-admin']);

        }
        else if(role === UserRole.LocalAdmin){
          localStorage.setItem('userId', userId);
         this.router.navigate(['/local-admin']);

        }
        else if(role === UserRole.BranchManager){
          localStorage.setItem('userId', userId);
         this.router.navigate(['/branch-manager']);
          
        }
        else if(role === UserRole.ProductOwner){
          localStorage.setItem('userId', userId);
         this.router.navigate(['/product-owner']);
          
        }
        else if(role === UserRole.TechnicalStaff){
          localStorage.setItem('userId', userId);
         this.router.navigate(['/technical-staff']);
          
        }
       
      },
      (error) => { 


        if (error.status === 404  && isNaN(checkID)) {
          this.errorMessage = "User ID should consist only of numbers.";
        } 
        else if (error.status === 404) {
          this.errorMessage = "Incorrect username or password.";
        } 
        else {
          this.errorMessage = "An unknown error has occurred.";
        }
        console.error(error);
        this.addErrorMessage(this.errorMessage);
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
          this.removeErrorMessage(this.errorMessage);
        }, 5000);
        
      }
      
    );
    event.preventDefault();


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

