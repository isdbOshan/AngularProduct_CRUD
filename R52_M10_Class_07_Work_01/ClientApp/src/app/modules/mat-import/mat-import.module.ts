import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


const Modules=[
  CommonModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: [
    ...Modules
  ],
  exports: [
    ...Modules
  ]
})
export class MatImportModule { }
