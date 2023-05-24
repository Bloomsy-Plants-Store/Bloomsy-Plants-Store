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
  errorMessage: any;
  isAdmin:boolean = false ;
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

  getUserRole(): any {
    const userRole = JSON.parse(localStorage.getItem('access_token')!)?.adminRole || false;
    if (userRole === false) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    return this.isAdmin;
  }

  getTotalItems(): any {
    const totalItems = JSON.parse(localStorage.getItem('totalItems')!);
    return totalItems;
  }

  logout(): void {
   const id = JSON.parse(localStorage.getItem('access_token')!).UserId;
       this.authService.logout(id).subscribe({
        next: async() => {
           await localStorage.removeItem("access_token");
           await localStorage.removeItem("x-auth-token");
           await localStorage.removeItem("remember_me_token");
          await localStorage.removeItem("totalItems");
          window.location.reload();
          console.log('Logout Successfully');
        },
        error: (err: any) => {
            this.errorMessage = 'LogOut Failed,Please Try Again';
        }
    })
  }

}

