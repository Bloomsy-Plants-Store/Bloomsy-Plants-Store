import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nav!: HTMLElement;
  userName= null;
  constructor() { }

  ngOnInit() {
  this.nav = document.querySelector("nav")!;
  // console.log(this.nav);

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
}
