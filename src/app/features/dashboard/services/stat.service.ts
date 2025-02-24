import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GemsStats, InventoryStats} from '@models/stats.model';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  private apiUrl = '/api/stats';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryStats[]> {
    return this.http.get<InventoryStats[]>(`${this.apiUrl}/inventory`);
  }

  getGems(): Observable<GemsStats[]> {
    return this.http.get<GemsStats[]>(`${this.apiUrl}/gems`);
  }

  getStats(): Observable<any> {
    return forkJoin({
      inventory: this.getInventory(),
      gems: this.getGems()
    });
  }

}
