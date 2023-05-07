import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validationForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
}
