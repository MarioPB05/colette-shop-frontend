import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InventoryModel} from '@models/inventory.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryModel[]> {
    return this.http.get<InventoryModel[]>(`${environment.baseUrl}/inventory/user/inventory`);
  }
}
