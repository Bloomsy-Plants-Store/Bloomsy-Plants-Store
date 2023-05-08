import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('myAnimation', [
      // state('inactive', style({
      //   backgroundColor: '#eee',
      //   transform: 'scale(1)'
      // })),
      // state('active', style({
      //   backgroundColor: '#cfd8dc',
      //   transform: 'scale(1.1)'
      // })),
      transition('inactive <=> active', animate('100ms ease-out'))
    ])
  ],
  template: `
    <div [@myAnimation]="state"></div>
  `
})
export class LoginComponent {
  validationForm: FormGroup;
  state = 'inactive';

  toggle() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
  }

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
