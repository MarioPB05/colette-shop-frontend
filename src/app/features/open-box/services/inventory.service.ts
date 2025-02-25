import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {InventoryBoxResponse} from '@core/models/box.model';
import {Observable} from 'rxjs';
import {SkipLoading} from '@interceptors/loading.interceptor';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getInventoryBox(id: number): Observable<InventoryBoxResponse> {
    return this.http.get<InventoryBoxResponse>(`/api/inventory/${id}`);
  }

  saveBoxOpenResults(id_item: number, data: any): Observable<any> {
    return this.http.post(`/api/inventory/${id_item}/open`, data, {
      context: new HttpContext().set(SkipLoading, true)
    });
  }
}
