import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../models/common/app-constants';
import { Manager } from '../models/manager';
import { ImagePath } from '../models/view-models/image-path';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Manager[]>{
    return this.http.get<Manager[]>(`${apiUrl}/api/Managers`)
  }
  getById(id:number):Observable<Manager>{
    return this.http.get<Manager>(`${apiUrl}/api/Managers/${id}`)
  }
  post(data:Manager):Observable<Manager>{
    return  this.http.post<Manager>(`${apiUrl}/api/Managers`, data)
  }
  upload(id:number, f:File):Observable<ImagePath>{
    const formData = new FormData();

    formData.append('file', f);
    return  this.http.post<ImagePath>(`${apiUrl}/api/Managers/Picture/Upload/${id}`, formData)
  }
  delete(id:number):Observable<any>{
    return  this.http.delete<any>(`${apiUrl}/api/Managers/${id}`)
  }
}
