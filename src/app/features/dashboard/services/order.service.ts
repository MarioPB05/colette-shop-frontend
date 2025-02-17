import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TableUserResponse} from '@core/models/user.model';
import {OrderDetailsResponse, TableOrderResponse} from '@core/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '/api/order';

  constructor(private http: HttpClient) {}

  getAllOrder(brawlTag:string): Observable<TableOrderResponse[]> {
    return this.http.get<TableOrderResponse[]>(`${this.apiUrl}/${brawlTag}`);
  }

  getOrderDetails(orderId: string): Observable<OrderDetailsResponse> {
    return this.http.get<OrderDetailsResponse>(`${this.apiUrl}/details/${orderId}`);
  }
}
