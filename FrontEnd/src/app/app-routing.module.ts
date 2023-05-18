import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsPageComponent } from './Components/Pages/Contact Us/contact-us-page/contact-us-page.component';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { LoginComponent } from './Components/Pages/Login_Register/login/login.component';
import { RegisterComponent } from './Components/Pages/Login_Register/register/register.component';
import { ALlProductsComponent } from './Components/Pages/All_Products/all-products/all-products.component';
import { ResetPasswordComponent } from './Components/Pages/Login_Register/reset-password/reset-password.component';
import { DashboardPageComponent } from './Components/Dashboard/dashboard-page/dashboard-page/dashboard-page.component';
import { AboutUsPageComponent } from './Components/Pages/about-us/about-us-page/about-us-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about-us', component: AboutUsPageComponent},
  { path: 'contact-us', component: ContactUsPageComponent},
  { path: 'products', component: ALlProductsComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'dashboard', component: DashboardPageComponent },
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
