import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RarityDetailResponse} from '@models/rarity.model';

@Injectable({
  providedIn: 'root'
})
export class RarityService {
  constructor(private http: HttpClient) {}

  getAllRarityDetails(): Observable<RarityDetailResponse[]> {
    return this.http.get<RarityDetailResponse[]>(`/api/rarity/details`);
  }
}
