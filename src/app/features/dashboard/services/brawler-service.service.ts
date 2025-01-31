import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TableBrawlerResponse} from '@core/models/brawler.model';

@Injectable({
  providedIn: 'root'
})
export class BrawlerServiceService {

  private apiUrl = '/api/brawlers';

  constructor(private http: HttpClient) {}

  getAllBrawlers(): Observable<TableBrawlerResponse[]> {
    return this.http.get<TableBrawlerResponse[]>(`${this.apiUrl}/`);
  }
}
