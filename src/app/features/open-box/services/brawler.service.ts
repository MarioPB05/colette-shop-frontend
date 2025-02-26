import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserBrawlerProbabilityResponse} from '@models/brawler.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrawlerService {
  constructor(private http: HttpClient) {}

  getUserProbabilityBrawlersFromBox(box_id: number): Observable<UserBrawlerProbabilityResponse[]> {
    return this.http.get<UserBrawlerProbabilityResponse[]>(`${environment.baseUrl}/brawlers/box/${box_id}/user`);
  }
}
