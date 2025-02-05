import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListBrawlerResponse, TableBrawlerResponse} from '@core/models/brawler.model';

@Injectable({
  providedIn: 'root'
})
export class BrawlerService {

  private apiUrl = '/api/brawlers';

  constructor(private http: HttpClient) {}

  getAllBrawlers(): Observable<TableBrawlerResponse[]> {
    return this.http.get<TableBrawlerResponse[]>(`${this.apiUrl}/`);
  }

  getAllBrawlersForBoxEditor(): Observable<ListBrawlerResponse[]> {
    return this.http.get<ListBrawlerResponse[]>(`${this.apiUrl}/list`);
  }

}
