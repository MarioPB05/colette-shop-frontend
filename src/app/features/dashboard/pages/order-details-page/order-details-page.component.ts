import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {OrderService} from '@dashboard/services/order.service';
import {InventoryOrderDetailsResponse, OrderDetailsResponse} from '@models/order.model';
import {ActivatedRoute} from '@angular/router';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {BoxTypeImages} from '@core/enums/box.enum';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-order-details-page',
  imports: [
    NgIf,
    PrimeTemplate,
    TableModule,
    DatePipe,
    Button,
  ],
  templateUrl: './order-details-page.component.html',
  styles: ``
})
export class OrderDetailsPageComponent implements OnInit {

  loadingData: boolean = true;
  protected orderDetails!: OrderDetailsResponse;
  protected orderDetailsItems: InventoryOrderDetailsResponse[] = [];

  private orderService = inject(OrderService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly BoxTypeImages = BoxTypeImages;
  isPrint: boolean = false;

  ngOnInit(): void {

    let orderId = this.route.snapshot.paramMap.get('orderId')!;

    this.orderService.getOrderDetails(orderId).subscribe({
      next: (order) => {
        this.orderDetails = order;
        this.loadingData = false;

        for (let item of order.inventory) {
          let itemIndex = this.orderDetailsItems.findIndex((i) => i.id === item.id);
          if (itemIndex !== -1) {
            this.orderDetailsItems[itemIndex].quantity++;
          } else {
            this.orderDetailsItems.push({...item, quantity: 1});
          }
        }

        this.orderDetailsItems.forEach((item) => {
          item.totalPrice = item.price * item.quantity;
        });
      },
      error: (error) => {
        console.error('Error getting order details:', error);
        this.loadingData = false;
      }
    });
  }

  subtotal(num:number): number {
    return Math.round((num/1.21)*100)/100;
  }

  iva(num:number): number {
    return Math.round((num*0.21)*100)/100;
  }

  printOrder() {
    this.isPrint = true;
    setTimeout(() => window.print(), 1000);
    setTimeout(() => this.isPrint = false, 1000);
  }
}
