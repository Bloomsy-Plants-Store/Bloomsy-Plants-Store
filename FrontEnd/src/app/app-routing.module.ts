import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { AboutUsComponent } from './Components/Pages/about-us/about-us.component';


const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'about-us',component:AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
