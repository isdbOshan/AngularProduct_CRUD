import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  products:Product[]=[];
  dataSource:MatTableDataSource<Product> = new MatTableDataSource(this.products);
  columnList = ['productName', 'sectionId', 'actions']
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private productSvc:ProductService,
    private notifySvc:NotifyService
  ){}
  ngOnInit(): void {
    this.productSvc.getWithSection()
      .subscribe({
        next: r=>{
          this.products=r;
          this.dataSource.data = this.products;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: er=>{
          this.notifySvc.notify("Failed to load section", "DISMISS");
        }
      })
  }

}
