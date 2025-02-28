import {Component, Input} from '@angular/core';
import {OrderUserDetailsResponse} from '@models/order.model';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class OrderCardComponent {
  @Input() order!: OrderUserDetailsResponse;

  timeOrder(): string {
    const purchaseDate = new Date(this.order.purchaseDate);
    const now = new Date();
    const diffInMs = now.getTime() - purchaseDate.getTime();
    if (Math.floor(Number(diffInMs / (1000 * 60 * 60) > 168))) {
      return `${Math.floor(diffInMs / (1000 * 60 * 60 * 24))} días`;
    }
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return `${diffInHours}h`;
  }

  numberFormat(value: number): string {
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(value);
  }

}
