import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Section } from 'src/app/models/section';
import { NotifyService } from 'src/app/services/notify.service';
import { SectionService } from 'src/app/services/section.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-section-view',
  templateUrl: './section-view.component.html',
  styleUrls: ['./section-view.component.css']
})
export class SectionViewComponent implements OnInit {

  sections:Section[] =[];
  dataSource:MatTableDataSource<Section> = new MatTableDataSource(this.sections);
  columnList = ['sectionName', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
   private sectionSvc:SectionService,
   private notifySvc:NotifyService,
   private matDialog: MatDialog
   ){}
   confirmDelete(item:Section){
     this.matDialog.open(ConfirmDialogComponent, {
       width: '450px'
     }).afterClosed()
     .subscribe({
       next:r=>{
         if(r){
           this.sectionSvc.delete(Number(item.sectionId))
           .subscribe({
             next:r=>{
               this.dataSource.data = this.dataSource.data.filter(x=> x.sectionId != item.sectionId);
             }
             ,
             error: err=>{
               this.notifySvc.notify("Failed to delete", "DISMISS");
             }
           })
         }
       }
     })
   }
  ngOnInit(): void {
    this.sectionSvc.get()
    .subscribe({
     next: r=>{
       this.sections = r;
       this.dataSource.data = this.sections;
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     },
     error:err=>{
       console.log(err.message || err);
     }
    })
 }
  }


