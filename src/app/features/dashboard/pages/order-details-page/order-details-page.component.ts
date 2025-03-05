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

  protected subtotal: number = 0;
  protected iva: number = 0;
  protected total: number = 0;
  protected cartTotal: number = 0;

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

        this.cartTotal = this.orderDetailsItems.reduce((acc, item) => acc + item.totalPrice, 0);
        this.subtotal = Math.round(((this.cartTotal/1.21) - this.orderDetails.discount)*100)/100;
        this.iva = Math.floor((this.subtotal*0.21)*100)/100;
        this.total = this.subtotal + this.iva;
      },
      error: (error) => {
        console.error('Error getting order details:', error);
        this.loadingData = false;
      }
    });
  }

  printOrder() {
    this.isPrint = true;
    setTimeout(() => window.print(), 1000);
    setTimeout(() => this.isPrint = false, 1000);
  }

  numberFormat(value: number): string {
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(value);
  }
}
