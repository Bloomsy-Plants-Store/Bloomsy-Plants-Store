import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from '../Components/Dashboard/dashboard-page/dashboard-page.component';
import { DashboardAllProductsComponent } from '../Components/Dashboard/dashboard-all-products/dashboard-all-products.component';
import { DashboardSidebarComponent } from '../Components/Dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardRevenueComponent } from '../Components/Dashboard/dashboard-revenue/dashboard-revenue.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardAllProductsComponent,
    DashboardSidebarComponent,
    DashboardRevenueComponent
  ],
  exports: [
    DashboardPageComponent,
    DashboardAllProductsComponent,
    DashboardSidebarComponent,
    DashboardRevenueComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule.forChild([
      { path: '', component: DashboardPageComponent }
    ])
  ]
})
export class DashboardModule { }
