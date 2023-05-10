import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  validationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validationForm = this.fb.group({
      name: ['',[ Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d$!%*#?&@]{8,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
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
}