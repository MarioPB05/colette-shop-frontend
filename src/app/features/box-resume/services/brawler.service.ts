import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InventoryBrawlerResponse} from '@models/brawler.model';

@Injectable({
  providedIn: 'root'
})
export class BrawlerService {
  constructor(private http: HttpClient) {}

  getInventoryBrawlers(item_id: number): Observable<InventoryBrawlerResponse[]> {
    return this.http.get<InventoryBrawlerResponse[]>(`/api/brawlers/inventory/${item_id}`);
  }
}
