import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RarityDetailResponse} from '@models/rarity.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RarityService {
  constructor(private http: HttpClient) {}

  getAllRarityDetails(): Observable<RarityDetailResponse[]> {
    return this.http.get<RarityDetailResponse[]>(`${environment.baseUrl}/rarity/details`);
  }
}
