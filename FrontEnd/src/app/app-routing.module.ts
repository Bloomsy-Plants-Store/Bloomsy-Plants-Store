import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsPageComponent } from './Components/Pages/Contact Us/contact-us-page/contact-us-page.component';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { AboutUsComponent } from './Components/Pages/about-us/about-us.component';
import { LoginOrRegisterComponent } from './Components/Pages/Login_Register/login-or-register/login-or-register.component';
import { ALlProductsComponent } from './Components/Pages/All_Products/all-products/all-products.component';


const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'about-us',component:AboutUsComponent},
  {path: 'login', component: LoginOrRegisterComponent},
  {path:'contact-us',component:ContactUsPageComponent}
  {path:'products',component:ALlProductsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
