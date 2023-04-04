import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { apiUrl } from '../models/common/app-constants';
import { Product } from '../models/product';
import { Section } from '../models/section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http:HttpClient) { }
  get():Observable<Section[]>{
    return this.http.get<Section[]>(`${apiUrl}/api/Sections`);
  }
  getById(id:number):Observable<Section>{
    return this.http.get<Section>(`${apiUrl}/api/Sections/${id}`);
  }
  getSectionProduct(id: Number):Observable<Product[]>{
    return this.http.get<Product[]>(`${apiUrl}/api/Sections/Products/${id}`);
  }
  post(data:Section):Observable<Section>{
    return this.http.post<Section>(`${apiUrl}/api/Sections`, data);
  }
  put(data:Section):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/Sections/${data.sectionId}`, data);
  }
  delete(id:number):Observable<any>{
    return this.http.get<Section>(`${apiUrl}/api/Sections/${id}`);
  }
}
