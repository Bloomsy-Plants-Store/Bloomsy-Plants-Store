import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from '../Components/Dashboard/dashboard-page/dashboard-page.component';
import { DashboardAllProductsComponent } from '../Components/Dashboard/dashboard-all-products/dashboard-all-products.component';
import { DashboardSidebarComponent } from '../Components/Dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardRevenueComponent } from '../Components/Dashboard/dashboard-revenue/dashboard-revenue.component';
import { AllProductsTablePaginationComponent } from '../Components/Dashboard/all-products-table-pagination/all-products-table-pagination.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardSidebarComponent,
    DashboardAllProductsComponent,
    AllProductsTablePaginationComponent,
    DashboardRevenueComponent
  ],
  exports: [
    DashboardPageComponent,
    DashboardSidebarComponent,
    DashboardAllProductsComponent,
    AllProductsTablePaginationComponent,
    DashboardRevenueComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule.forChild([
      { path: '', component: DashboardPageComponent }
    ])
  ]
})
export class DashboardModule { }
