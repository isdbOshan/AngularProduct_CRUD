import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Manager } from 'src/app/models/manager';
import { Product } from 'src/app/models/product';
import { Section } from 'src/app/models/section';
import { ManagerService } from 'src/app/services/manager.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-manager-create',
  templateUrl: './manager-create.component.html',
  styleUrls: ['./manager-create.component.css']
})
export class ManagerCreateComponent implements OnInit {
  manager:Manager ={};
  managerForm:FormGroup = new FormGroup({
    managerName: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    sectionId: new FormControl(undefined),
    productId: new FormControl(undefined, Validators.required)
  });
  //for dropdowns
  sections:Section[] =[];
  products:Product[] =[];
  //for picture
  pic:File=null!;
  constructor(
    private managerSvc:ManagerService,
    private sectionSvc:SectionService,
    private notifySvc: NotifyService
  ){}
  get f(){
    return this.managerForm.controls;
  }
  upload(id:number){
    let reader = new FileReader();
    reader.onload = (e:any)=>{
      this.managerSvc.upload(id, this.pic)
      .subscribe({
        next: r=>{
          //this.manager.picture=r;
          console.log(r);
          this.notifySvc.notify("Data saved", "DISMISS");
          this.manager={};
          this.managerForm.reset();
          this.managerForm.markAsPristine();
        },
        error:err=>{
          this.notifySvc.notify("Upload failed", "DISMISS")
        }
      })
    }
    reader.readAsArrayBuffer(this.pic);
  }
  save(){
    if(this,this.managerForm.invalid) return;
    //console.log(this.managerForm.value);
    Object.assign(this.manager, this.managerForm.value);
    this.managerSvc.post(this.manager)
    .subscribe({
      next:r=>{
        console.log(r);
        this.upload(Number(r.managerId));
      },
      error:err=>{
        this.notifySvc.notify("Data save failed", "DISMISS")
      }
    });
  }
  sectionCahnged(event:any){
    console.log(event.value);
    let id=event.value;
    this.products=[];
    this.sectionSvc.getSectionProduct(id)
    .subscribe({
      next:r=>{
        this.products=r;
      },
      error:err=>{
        this.notifySvc.notify("Failed to load products", "DISMISS");
      }
    })
  };
  fileChanged(event:any){
    if(event.target.files.length){
      let f= event.target.files[0];
      //console.log(f);
      this.pic=f;
      this.f['picture'].patchValue(f.name);
    }
  }
  ngOnInit(): void {
    this.sectionSvc.get()
    .subscribe({
      next: r=>{
        this.sections=r;
        
      },
      error:err=>{
        this.notifySvc.notify("Failed to load sections", "DISMISS");
      }
    })
  }
}
