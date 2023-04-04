import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManagerCreateComponent } from './components/manager/manager-create/manager-create.component';
import { ManagerEditComponent } from './components/manager/manager-edit/manager-edit.component';
import { ManagerViewComponent } from './components/manager/manager-view/manager-view.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { SectionCreateComponent } from './components/section/section-create/section-create.component';
import { SectionEditComponent } from './components/section/section-edit/section-edit.component';
import { SectionViewComponent } from './components/section/section-view/section-view.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'sections', component:SectionViewComponent},
  {path:'section-create', component:SectionCreateComponent},
  {path:'section-edit/:id', component:SectionEditComponent},
  {path:'products', component:ProductViewComponent},
  {path:'product-create', component:ProductCreateComponent},
  {path:'product-edit/:id', component:ProductEditComponent},
  {path:'managers', component:ManagerViewComponent},
  {path:'manager-create', component:ManagerCreateComponent},
  {path:'manager-edit/:id', component:ManagerEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
