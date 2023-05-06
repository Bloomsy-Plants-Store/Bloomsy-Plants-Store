import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { NavbarComponent } from './Components/Partials/navbar/navbar.component';
import { BannersComponent } from './Components/Pages/Home/banners/banners.component';
import { HeaderComponent } from './Components/Pages/Home/header/header.component';
import { SampleProductsComponent } from './Components/Pages/Home/sample-products/sample-products.component';
import { ReviewComponent } from './Components/Pages/Home/review/review.component';
import { AboutComponent } from './Components/Pages/Home/about/about.component';
import { SupportComponent } from './Components/Pages/Home/support/support.component';
import { FooterComponent } from './Components/Partials/footer/footer.component';


import { ScrollTopComponent } from './Components/Pages/Home/scroll-top/scroll-top.component';

import { LoginOrRegisterComponent } from './Components/Pages/Login_Register/login-or-register/login-or-register.component';
import { RegisterComponent } from './Components/Pages/Login_Register/register/register.component';

import { ContactUsPageComponent } from './Components/Pages/Contact Us/contact-us-page/contact-us-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleProductsComponent,
    HomePageComponent,
    HeaderComponent,
    ReviewComponent,
    NavbarComponent,
    FooterComponent,
    SupportComponent,
    AboutComponent,
    BannersComponent,
    LoginOrRegisterComponent,
    RegisterComponent,
    ScrollTopComponent,
    ContactUsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
