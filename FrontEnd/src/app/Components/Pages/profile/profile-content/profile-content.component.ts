
import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent {
  Products: any;
  currentPage = 1; // Current page number
  itemsPerPage = 12; // Number of items to display per page
  totalItems=0;
  selectedProduct: any;
  constructor(private elementRef: ElementRef, public myService: ProductsService, public myCartService:CartService ) { }

  ngOnInit(): void {

    this.myService.GetAllProducts().subscribe({
      next: (response: any) => {
        this.Products = response.data;
        console.log(this.Products);
        this.totalItems= this.Products.length;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getUpperBound(): number {
    const upperBound = (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
    return Math.min(upperBound, this.totalItems);
  }

  // add product to cart
  addProductToCart(id:any) {
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    this.myCartService.addProductToCart(userId, id).subscribe({
      next: (response: any) => { },
      error: (err:any) => {
        console.log(err);
      }
    });

  }

  changeTabContent(product: any) {
    this.selectedProduct = product;
    const ordersTab = document.getElementById('ex-with-icons-tabs-1');
    const tab = document.getElementById('ex-with-icons-tabs-4');
    if (ordersTab) {
      ordersTab.classList.remove('show', 'active');
      tab?.classList.add('show', 'active')
    }
  }
  returnTabContent() {
    const ordersTab = document.getElementById('ex-with-icons-tabs-1');
    const tab = document.getElementById('ex-with-icons-tabs-4');
    if (ordersTab) {
      ordersTab.classList.add('show', 'active');
      tab?.classList.remove("show","active")
    }
  }
  handleFavorite(){
    const tab = document.getElementById('ex-with-icons-tabs-4');
    tab?.classList.remove("show","active")
  }
}
