import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { MatSliderModule } from '@angular/material/slider';
@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('500ms', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeOut', [
      state('*', style({ opacity: 1 })),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]

})

export class FilterSideBarComponent {
  rangeValues: number[] = [20, 80]; // Example range values

  onRangeChange(event: any) {
    // Update the range values
    this.rangeValues = event.value;
  }
  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
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
