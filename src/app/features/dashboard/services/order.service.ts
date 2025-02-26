import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderDetailsResponse, TableOrderResponse} from '@core/models/order.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAllOrder(brawlTag:string): Observable<TableOrderResponse[]> {
    return this.http.get<TableOrderResponse[]>(`${environment.baseUrl}/order/${brawlTag}`);
  }

  getOrderDetails(orderId: string): Observable<OrderDetailsResponse> {
    return this.http.get<OrderDetailsResponse>(`${environment.baseUrl}/order/details/${orderId}`);
  }
}
