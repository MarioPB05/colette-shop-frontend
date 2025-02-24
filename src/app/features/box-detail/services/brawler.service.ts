import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BrawlerProbabilityResponse} from '@models/brawler.model';

@Injectable({
  providedIn: 'root'
})
export class BrawlerService {

  private apiUrl = '/api/brawlers';

  constructor(private http: HttpClient) {}

  getBrawlersProbabilityFromBox(id: number): Observable<BrawlerProbabilityResponse[]> {
    return this.http.get<BrawlerProbabilityResponse[]>(`${this.apiUrl}/box/${id}`);
  }
}
