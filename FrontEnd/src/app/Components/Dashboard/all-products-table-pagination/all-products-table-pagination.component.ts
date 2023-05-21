import { AfterViewInit, ChangeDetectorRef, Component, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-all-products-table-pagination',
  styleUrls: ['all-products-table-pagination.component.css'],
  templateUrl: 'all-products-table-pagination.component.html',
})
export class AllProductsTablePaginationComponent implements AfterViewInit {
  selectedID:any;
  errorMessage:any;

  displayedColumns: string[] = ['name','price', 'category','discount','itemsinStock','action'];
  dataSource = new MatTableDataSource<PeriodicElement>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private elementRef: ElementRef, public myService: ProductsService,private productsService: ProductsService,private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchAllProducts();
  }

  async fetchAllProducts() {
    try {
      const data: any = await this.productsService.GetAllProdducts().toPromise();
      this.dataSource.data = data.data;
      console.log('After assignment:', this.dataSource.data );
      this.changeDetectorRef.detectChanges();
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  }




  deleteElement(element: PeriodicElement) {
    // Implement the logic to delete the element
  }

  editElement(element: PeriodicElement) {
    // Implement the logic to edit the element
  }
  setSelectedId(id:number)
  {
    this.selectedID=id;
    console.log(this.selectedID)
    console.log(id)
  }
  deletedSelectedProduct()
  {
    this.myService.DeleteProductById(this.selectedID).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Deleted this product Failed,Please Try Again';
      }
    })
  }
}

interface PeriodicElement {
  name:String,
  price:Number,
  category:[String],
  rate:Number,
  discount:Number,
  itemsinStock: Number,
  action:any,
}





