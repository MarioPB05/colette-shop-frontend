import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BoxCartRequest, BoxCartResponse} from '@models/box.model';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) {}

  getCartBoxes(request: BoxCartRequest): Observable<BoxCartResponse[]> {
    return this.http.post<BoxCartResponse[]>(`${environment.baseUrl}/boxes/cart`, request);
  }

}
