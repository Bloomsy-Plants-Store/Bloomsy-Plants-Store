import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nav!: HTMLElement;
  userName:any;
  errorMessage:any;
  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  this.nav = document.querySelector("nav")!;

  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.nav.classList.add("scrolled",".navbar-brand",".nav-link",".fa-bars");
    } else {
      this.nav.classList.remove("scrolled",".navbar-brand",".nav-link",".fa-bars");
    }
  }

  getUserNameFromLocalStorage(): any {
    const token = localStorage.getItem('access_token');
    if (token != null) {
      this.userName = JSON.parse(token).UserName;
    } else {
      this.userName = null;
    }
    return this.userName;
  }

  logout(): void {
       this.authService.logout().subscribe({
        next: async() => {
          await localStorage.removeItem("access_token");
          window.location.reload();
          console.log('Logout Successfully');
        },
        error: (err: any) => {
            this.errorMessage = 'LogOut Failed,Please Try Again';
        }
    })
  }

}

