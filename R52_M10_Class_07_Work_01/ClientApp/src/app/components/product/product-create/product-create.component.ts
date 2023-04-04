import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Section } from 'src/app/models/section';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  products:Product = {};
  sections:Section[]=[];
  productForm:FormGroup = new FormGroup({
    productName:new FormControl('', [Validators.required]),
    sectionId:new FormControl(undefined, [Validators.required])
  });
  constructor(
    private productSvc:ProductService,
    private notifySvc:NotifyService,
    private sectionSvc:SectionService
  ){}

  get f(){
    return this.productForm.controls;
  }
  save(){
    if(this.productForm.invalid) return;
    Object.assign(this.products, this.productForm.value);
    this.productSvc.post(this.products)
      .subscribe({
        next: r=>{
          this.notifySvc.notify("Data Saved", "DISMISS");
          this.products={};
          this.productForm.reset({});
          this.productForm.markAsPristine();
          this.productForm.markAsUntouched();
        },
        error: er=>{
          this.notifySvc.notify("Data Save Failed", "DISMISS");
        }
      })
  }
  ngOnInit(): void {
    this.sectionSvc.get()
      .subscribe({
        next:r=>{
          this.sections=r;
        },
        error: er=>{
          this.notifySvc.notify("Section load Failed", "DISMISS");
        }
      })
  }
}
