import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { apiUrl } from 'src/app/models/common/app-constants';
import { Manager } from 'src/app/models/manager';
import { Product } from 'src/app/models/product';
import { ManagerService } from 'src/app/services/manager.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent {
  manager:Manager[] =[];
  product:Product[]=[];
  dataSource:MatTableDataSource<Product> = new MatTableDataSource(this.manager);
  columnList = ['managerName','picture','productId', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  imgPath=apiUrl+"/Images";
  
  constructor(
    private managerSrv:ManagerService,
    private matDialog:MatDialog,
    private sanitizer: DomSanitizer){
      
    }
getSafeUrl(p:string){
  return this.sanitizer.bypassSecurityTrustResourceUrl(this.imgPath+"/"+p);
}
  confirmDelete(item:Manager){
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed()
    .subscribe({
      next:r=>{
        if(r){
          this.managerSrv.delete(Number(item.productId))
          .subscribe({
            next:r=>{
              this.dataSource.data = this.dataSource.data.filter(x=> x.productId != item.productId);
            }
            ,
            error: err=>{
              // this.notifySvc.notify("Failed to delete", "DISMISS");
            }
          })
        }
      }
    })
  }


   ngOnInit(): void {
      this.managerSrv.get()
      .subscribe({
       next: r=>{
         this.manager = r;
         console.log(r)
         this.dataSource.data = this.manager;
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
       },
       error:err=>{
         console.log(err.message || err);
       }
      })
   }
}
