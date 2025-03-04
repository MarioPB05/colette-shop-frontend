import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateOrderRequest, OrderDetailsResponse} from '@models/order.model';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {APIResponse} from '@models/commons.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  createOrder(request: CreateOrderRequest): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.baseUrl}/order/create`, request);
  }

  payOrder(orderId: number): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.baseUrl}/order/pay/${orderId}`, {});
  }

}
