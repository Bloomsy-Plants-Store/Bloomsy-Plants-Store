import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  validationForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.validationForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d$!%*#?&@]{8,}$/),
        ],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    });
  }

  get name() {
    return this.validationForm.get('name');
  }

  get email() {
    return this.validationForm.get('email');
  }

  get password() {
    return this.validationForm.get('password');
  }

  get phone() {
    return this.validationForm.get('phone');
  }

  register(name: any, email: any, phone: any, password: any): void {
    if (this.validationForm.valid) {
      this.authService
        .register(name.value, email.value, phone.value, password.value)
        .subscribe({
          next: (response:any) => {
            // console.log(response.body);
          },
          error: (err:any) => {
            if(err.status == 400){
              this.errorMessage = 'Invalid Data,Please Try Again';
            }else{
              this.errorMessage = 'Registration Failed,Please Try Again';
            }
          },
        });
    }else {
      console.log('Invalid Data');
    }
    setInterval(() => {
      this.errorMessage = '';
    }, 5000);
  }
}
