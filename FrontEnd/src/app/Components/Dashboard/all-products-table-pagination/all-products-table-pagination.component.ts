import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProductsService } from 'src/app/Services/products.service';



@Component({
  selector: 'app-all-products-table-pagination',
  styleUrls: ['all-products-table-pagination.component.css'],
  templateUrl: 'all-products-table-pagination.component.html',
})

export class AllProductsTablePaginationComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selectedID:any;
  errorMessage:any;


  constructor(private elementRef: ElementRef, public myService: ProductsService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', action:'delete'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',action:'delete'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',action:'delete'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',action:'delete'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',action:'delete'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',action:'delete'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',action:'delete'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',action:'delete'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];



