import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { LoginOrRegisterComponent } from './Components/Pages/Login_Register/login-or-register/login-or-register.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginOrRegisterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
