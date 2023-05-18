import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';

  isLoginPage!: boolean;
  isSignUpPage!: boolean;
  isResetPasswordPage!: boolean;
  isDashboardPage!: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.isLoginPage = (this.router.url === '/login');
      this.isSignUpPage = (this.router.url === '/register');
      this.isResetPasswordPage = (this.router.url === '/reset-password');
      this.isDashboardPage = this.router.url.startsWith('/dashboard');

    });
  }
}
