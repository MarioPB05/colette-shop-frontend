import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListBrawlerResponse, TableBrawlerResponse} from '@core/models/brawler.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrawlerService {

  constructor(private http: HttpClient) {}

  getAllBrawlers(): Observable<TableBrawlerResponse[]> {
    return this.http.get<TableBrawlerResponse[]>(`${environment.baseUrl}/brawlers/`);
  }

  getAllBrawlersForBoxEditor(): Observable<ListBrawlerResponse[]> {
    return this.http.get<ListBrawlerResponse[]>(`${environment.baseUrl}/brawlers/list`);
  }

}
