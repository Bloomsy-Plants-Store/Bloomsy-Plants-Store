import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-revenue',
  templateUrl: './dashboard-revenue.component.html',
  styleUrls: ['./dashboard-revenue.component.css']
})
export class DashboardRevenueComponent {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
