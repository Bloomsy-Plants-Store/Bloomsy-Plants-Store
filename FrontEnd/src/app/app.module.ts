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
import { RegisterComponent } from './Components/Pages/Login_Register/register/register.component';
import { ContactUsBannerComponent } from './Components/Pages/Contact Us/contact-us-banner/contact-us-banner/contact-us-banner.component';
import { ContactUsPageComponent } from './Components/Pages/Contact Us/contact-us-page/contact-us-page.component';
import { ContactUsFormComponent } from './Components/Pages/Contact Us/contact-us-form/contact-us-form/contact-us-form.component';
import { AboutUsHeaderComponent } from './Components/Pages/about-us/about-us-header/about-us-header.component';
import { ALlProductsComponent } from './Components/Pages/All_Products/all-products/all-products.component';
import { AllProductsHeaderComponent } from './Components/Pages/All_Products/all-products-header/all-products-header.component';
import { LoginComponent } from './Components/Pages/Login_Register/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './Components/Pages/Login_Register/reset-password/reset-password.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FilterSideBarComponent } from './Components/Pages/All_Products/filter-side-bar/filter-side-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AllProductDataComponent } from './Components/Pages/All_Products/all-product-data/all-product-data.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    BannersComponent,
    HeaderComponent,
    SampleProductsComponent,
    ReviewComponent,
    SupportComponent,
    AboutComponent,
    ScrollTopComponent,
    FooterComponent,
    RegisterComponent,
    ContactUsPageComponent,
    LoginComponent,
    ContactUsBannerComponent,
    ContactUsFormComponent,
    AboutUsHeaderComponent,
    ALlProductsComponent,
    AllProductsHeaderComponent,
    ResetPasswordComponent,
    FilterSideBarComponent,
    AllProductDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatSidenavModule,
    MatButtonModule,
    NgxSliderModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

