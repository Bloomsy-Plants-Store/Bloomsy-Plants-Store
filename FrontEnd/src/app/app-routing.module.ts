import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsPageComponent } from './Components/Pages/Contact Us/contact-us-page/contact-us-page.component';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';


const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'contact-us',component:ContactUsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
