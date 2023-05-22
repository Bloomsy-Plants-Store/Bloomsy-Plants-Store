import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.css']
})
export class ContactUsFormComponent {
  private mapBtn!: HTMLButtonElement;
  private formBtn!: HTMLButtonElement;
  private contactContainer!: HTMLElement;
  private mapContainer!: HTMLElement;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.mapBtn = document.getElementById("map-btn") as HTMLButtonElement;
      this.formBtn = document.getElementById("form-container-icon") as HTMLButtonElement;
      this.contactContainer = document.getElementById("contact-container") as HTMLElement;
      this.mapContainer = document.getElementById("map") as HTMLElement;

      this.formBtn.addEventListener('click', () => {
        this.contactContainer.classList.add("right-panel-active");
      });

      this.mapBtn.addEventListener('click', () => {
        this.mapContainer.classList.remove("left-panel-active");
      });
    });
  }
}

