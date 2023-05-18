import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LabelType, Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.css'],
})

export class FilterSideBarComponent {
  minValue: number = 100;
  maxValue: number = 750;
  selectedOption: string | undefined;
  sortOptions: string[] = ['Default sorting','Sort by average rating', 'Sort by price: low to high', 'Sort by price: high to low'];

  options: Options = {
    floor: 100,  //the minimum value of the slider
    ceil: 1500, //the maximum value of the slider
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };
  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }


  onOptionSelected(option: string) {
    this.selectedOption = option;
    // Perform sorting logic or other actions based on the selected option
    console.log('Selected Option:', this.selectedOption);
  }
  categories = [
    {
      id:"0",
      name: "Low Maintenance",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-11.jpg",
      count:3
    },
    {
      id:"1",
      name: "Indoor Plants",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-10.jpg",
      count:3
    },
    {
      id:"2",
      name: "Ceramic Pots",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-8.jpg",
      count:3
    },
    {
      id:"3",
      name: "Air Purifying",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-7.jpg",
      count:3
    },
    {
      id:"4",
      name: "Plant Bundle",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-12.jpg",
      count:3
    }
  ]
}
