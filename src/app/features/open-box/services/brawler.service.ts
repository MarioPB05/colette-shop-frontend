import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserBrawlerProbabilityResponse} from '@models/brawler.model';

@Injectable({
  providedIn: 'root'
})
export class BrawlerService {
  constructor(private http: HttpClient) {}

  getUserProbabilityBrawlersFromBox(box_id: number): Observable<UserBrawlerProbabilityResponse[]> {
    return this.http.get<UserBrawlerProbabilityResponse[]>(`/api/brawlers/box/${box_id}/user`);
  }
}
