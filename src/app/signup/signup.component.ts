import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Fix for styleUrl
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  hidePassword: boolean = true; // Fix for typing

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar, // Fix for snackBar
    private authService: AuthService, // Assuming you have an AuthService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword=this.signUpForm.get('confirmPassword')?.value;

    if(password!=confirmPassword)
      {
        this.snackBar.open('Password do not matched','Close',{duration:5000,panelClass:'error-snackbar'});
         return;
      }

      this.authService.register(this.signUpForm.value).subscribe(
        (respone) =>{
          this.snackBar.open('signup successfull','Close',{duration:5000});
          this.router.navigateByUrl("/login");
        },
        (error) =>{
          this.snackBar.open('signup failed.Please try again','Close',{duration:5000,panelClass:'error-snackbar'});
        }
      )
  }
}
