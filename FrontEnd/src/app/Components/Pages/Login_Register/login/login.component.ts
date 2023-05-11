import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validationForm: FormGroup;
  errorMessage:any;

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient, private router: Router ,  private tokenService: TokenService) {
    this.validationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d$!%*#?&@]{8,}$/)]],
    });
  }

  get email() {
    return this.validationForm.get('email');
  }

  get password() {
    return this.validationForm.get('password');
  }

  Login(email: any, password: any): void {
    if (this.validationForm.valid) {
      this.authService.login(email.value, password.value).subscribe({
        next: (response: any) => {
          const token = response.headers.get('x-auth-token');
          this.tokenService.setToken(token);
          const decodedToken: any = jwt_decode(token);
          localStorage.setItem('access_token', JSON.stringify(decodedToken));
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          if(err.status == 400){
            this.errorMessage = 'Invalid Email or Password';
          }else{
            this.errorMessage = 'Login Failed,Please Try Again';
          }
        }
      });
    } else {
      console.log('Invalid Data');
    }

    setInterval(() => {
      this.errorMessage = '';
    }, 5000);
  }

  LoginWithGoogle(): void {
    console.log('Login With Google');
    this.authService.loginWithGoogle().subscribe({
      next: (response: any) => {

        const token = response.headers.get('x-auth-token');
        console.log('Token:', token);
      },
      error: (err: any) => {
      }
    });
  }

  LoginWithFacebook(): void {
    console.log('Login With Facebook');
    this.authService.loginWithFacebook().subscribe({
      next: (response: any) => {
        console.log(response);
        const token = response.headers.get('x-auth-token');
        console.log('Token:', token);
      },
      error: (err: any) => {
        // console.log(err);
      }
    });
  }
}