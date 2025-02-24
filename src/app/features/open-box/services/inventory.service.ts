import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InventoryBoxResponse} from '@core/models/box.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getInventoryBox(id: number): Observable<InventoryBoxResponse> {
    return this.http.get<InventoryBoxResponse>(`/api/inventory/${id}`);
  }
}
