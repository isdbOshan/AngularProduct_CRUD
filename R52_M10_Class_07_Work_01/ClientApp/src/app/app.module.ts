import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MultilevelMenuService } from 'ng-material-multilevel-menu';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SectionService } from './services/section.service';
import { ProductService } from './services/product.service';
import { ManagerService } from './services/manager.service';
import { SectionViewComponent } from './components/section/section-view/section-view.component';
import { SectionCreateComponent } from './components/section/section-create/section-create.component';
import { SectionEditComponent } from './components/section/section-edit/section-edit.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { NotifyService } from './services/notify.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagerViewComponent } from './components/manager/manager-view/manager-view.component';
import { ManagerCreateComponent } from './components/manager/manager-create/manager-create.component';
import { ManagerEditComponent } from './components/manager/manager-edit/manager-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SectionViewComponent,
    SectionCreateComponent,
    SectionEditComponent,
    ProductViewComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ConfirmDialogComponent,
    ManagerViewComponent,
    ManagerCreateComponent,
    ManagerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatImportModule,
    NgMaterialMultilevelMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MultilevelMenuService, HttpClient, SectionService, ProductService, ManagerService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
