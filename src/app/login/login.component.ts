import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/auth/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup<any>;
  hidePassword: any =true;
  
constructor(
  private formbuilder:FormBuilder,
  private authservice:AuthService,
  private snackBar:MatSnackBar,
  private router : Router
){}


ngOnInit(): void {
  this.loginForm = this.formbuilder.group({
    email: [null, [Validators.required]],    
    password: [null, [Validators.required]],
  });
}

togglePasswordVisibility() {
  this.hidePassword = !this.hidePassword;
}


onSubmit() {
  const username = this.loginForm.get('email')?.value;
  const password=this.loginForm.get('password')?.value;
  console.log('username :',username,' and password: ',password)

    this.authservice.login(username,password).subscribe(
      (response) =>{
        if(UserStorageService.isAdminLoggedIn())
          {
            this.router.navigateByUrl('admin/dashboard');
          }
          else if(UserStorageService.isCustomerLoggedIn())
            {
            this.router.navigateByUrl('customer/dashboard');
            }
      },
      (error) =>{
        this.snackBar.open('Bad Credentials.Please try again','Error',{duration:5000});
      }
    )
    console.log('UserStorageService.isAdminLoggedIn()-->',UserStorageService.isAdminLoggedIn())
    console.log('UserStorageService.isAdminLoggedIn()-->',UserStorageService.isCustomerLoggedIn())
}
}
