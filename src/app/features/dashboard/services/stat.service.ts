import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InventoryStats} from '@models/stats.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  private apiUrl = '/api/stats';

  constructor(private http: HttpClient) {}

  getStatBox(): Observable<InventoryStats[]> {
    return this.http.get<InventoryStats[]>(`${this.apiUrl}/inventory`);
  }

}
