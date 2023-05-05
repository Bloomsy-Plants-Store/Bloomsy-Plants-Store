import { Component } from '@angular/core';

@Component({
  selector: 'app-login-or-register',
  templateUrl: './login-or-register.component.html',
  styleUrls: ['./login-or-register.component.css'],
})
export class LoginOrRegisterComponent {
  private signInBtn!: HTMLButtonElement;
  private signUpBtn!: HTMLButtonElement;
  private container!: HTMLElement;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.signInBtn = document.getElementById("sign-in-btn") as HTMLButtonElement;
      this.signUpBtn = document.getElementById("sign-up-btn") as HTMLButtonElement;
      this.container = document.getElementById("container") as HTMLElement;

      this.signUpBtn.addEventListener('click', () => {
        this.container.classList.add("right-panel-active");
      });

      this.signInBtn.addEventListener('click', () => {
        this.container.classList.remove("right-panel-active");
      });
    });
  }
}
