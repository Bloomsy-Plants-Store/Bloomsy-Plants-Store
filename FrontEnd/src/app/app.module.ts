import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleProductsComponent } from './Components/Pages/Home/sample-products/sample-products.component';
import { HomepageComponent } from './Components/Pages/Home/homepage/homepage.component';
import { AboutComponent } from './Components/Pages/Home/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleProductsComponent,
    HomepageComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
