import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validationForm: FormGroup;
  errorMessage:any;

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {
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

  Login(email:any ,password:any): void {
    if(this.validationForm.valid){
      this.authService.login(email.value, password.value).subscribe(
        response => {
          console.log(response);
          const token = response.headers;
          console.log(token);
        },
        error => {
          if(error.status == 400){
            this.errorMessage = 'Invalid Email or Password';
          }else{
            this.errorMessage = 'Login Failed,Please Try Again';
          }
        }
      );
    }else{
      console.log("Invalid Data")
    }

    setInterval(()=>{
      this.errorMessage = '';
    },5000)

  }


}
