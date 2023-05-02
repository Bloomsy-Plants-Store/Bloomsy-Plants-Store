import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleProductsComponent } from './Components/Pages/Home/sample-products/sample-products.component';
import { AboutComponent } from './Components/Pages/Home/about/about.component';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleProductsComponent,
    AboutComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
