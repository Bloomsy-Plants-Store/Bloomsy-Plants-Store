import { Component, ElementRef  , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent{
  validationCheckoutForm!: FormGroup;
  @ViewChild('successModal') successModal!: ElementRef;
  errorMessage: any;
  formattedInputValue!: string;
  formattedMonth: string = '';
  sectionVisible = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.validationCheckoutForm = this.fb.group({
      name: [
      '',
        [Validators.required,
          Validators.pattern(/^[a-zA-Z\s]{3,30}$/)],
      ],
      creditNumber: [
        '',
        [Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
          Validators.minLength(16),
          Validators.maxLength(16)],
      ],
      creditMonth: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0?[1-9]|1[0-2])$/),
          Validators.minLength(1),
          Validators.maxLength(2)],
      ],
      creditYear: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{2}$/),
          Validators.minLength(2),
          Validators.maxLength(2),
        ]
      ],
      creditCVC: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{3,4}$/),
          Validators.minLength(3),
          Validators.maxLength(4),
        ]
      ]
    })
  }

  get inputName() {
    return this.validationCheckoutForm.get('name');
  }

 get inputCreditNumber() {
    return this.validationCheckoutForm.get('creditNumber');
  }
  get inputCreditMonth() {
    return this.validationCheckoutForm.get('creditMonth');
  }
  get inputCreditYear() {
    return this.validationCheckoutForm.get('creditYear');
  }
  get inputCreditCVC() {
    return this.validationCheckoutForm.get('creditCVC');
  }
  formatCreditNumber() {
    const creditNumber = this.validationCheckoutForm.get('creditNumber')?.value;
    this.formattedInputValue =  creditNumber.toString().replace(/\d{4}(?=.)/g, '$& ') ;
  }
  formatMonth() {
    const creditMonth = this.validationCheckoutForm.get('creditMonth')?.value;
    if (creditMonth.length == 1) {
      this.formattedMonth = '0' + creditMonth ;
    }
    else {
      this.formattedMonth = creditMonth;
    }
  }
  showModal(){
    const modal = new bootstrap.Modal(this.successModal.nativeElement);
    modal.show();
  }
  redirectToHome() {
    this.router.navigate(['/']);
  }
  checkout(): void{
    if (this.validationCheckoutForm.valid) {
      this.showModal();
    }
  }
}
