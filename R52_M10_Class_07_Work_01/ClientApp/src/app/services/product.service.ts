import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductViewComponent } from '../components/product/product-view/product-view.component';
import { apiUrl } from '../models/common/app-constants';
import { Product } from '../models/product';
import { Section } from '../models/section';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getWithSection():Observable<Product[]>{
    return this.http.get<Product[]>(`${apiUrl}/api/Products`);
  }
  post(data:Section):Observable<Product>{
    return this.http.post<Product>(`${apiUrl}/api/Products`, data);
  }
}
