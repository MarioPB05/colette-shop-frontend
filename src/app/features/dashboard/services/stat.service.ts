import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GemsStats, InventoryStats} from '@models/stats.model';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryStats[]> {
    return this.http.get<InventoryStats[]>(`${environment.baseUrl}/stats/inventory`);
  }

  getGems(): Observable<GemsStats[]> {
    return this.http.get<GemsStats[]>(`${environment.baseUrl}/stats/gems`);
  }

  getStats(): Observable<any> {
    return forkJoin({
      inventory: this.getInventory(),
      gems: this.getGems()
    });
  }

}
