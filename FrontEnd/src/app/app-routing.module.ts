import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { ALlProductsComponent } from './Components/Pages/All_Products/all-products/all-products.component';


const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'products',component:ALlProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
