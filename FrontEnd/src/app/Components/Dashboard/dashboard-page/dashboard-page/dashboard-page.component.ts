import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  body = document.querySelector("body");
  sidebar = this.body?.querySelector("nav");
  toggle = this.body?.querySelector(".toggle");
  searchBtn = this.body?.querySelector(".search-box");
  modeSwitch = this.body?.querySelector(".toggle-switch");
  modeText = this.body?.querySelector(".mode-text");

  constructor() {
    this.toggle?.addEventListener("click", () => {
      this.sidebar?.classList.toggle("close");
    });

    this.searchBtn?.addEventListener("click", () => {
      this.sidebar?.classList.remove("close");
    });

  }

}
