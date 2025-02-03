import {Component, inject, OnInit} from '@angular/core';
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {DatePipe, NgClass} from '@angular/common';
import {TableOrderResponse} from '@core/models/order.model';
import {OrderService} from '@dashboard/services/order.service';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-table-order',
  imports: [
    IconField,
    InputIcon,
    InputText,
    PrimeTemplate,
    TableModule,
    NgClass,
    DatePipe,
    Tooltip
  ],
  templateUrl: './table-order.component.html',
  styles: ``
})
export class TableOrderComponent implements OnInit {
  protected orders: TableOrderResponse[] = [];
  private orderFilter: TableOrderResponse[] = [];
  private orderOriginal: TableOrderResponse[] = [];
  orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.getAllOrder().subscribe({
      next: brawlers => {
        for (const brawler of brawlers) {
          this.orders.push(brawler);
          this.orderOriginal.push(brawler);
        }
      },
      error: err => {
        console.error('Error al cargar los pedidos:', err);
      }
    });
  }

  filterOrderForInvoiceNumber(event: any): void {
    this.orderFilter = this.orderOriginal.filter(order => order.invoice_number.toLowerCase().includes(event.target.value.toLowerCase()));
    this.orders = this.orderFilter;
  }


  getBadgeClass(state: string): string {
    switch (state) {
      case 'Pendiente':
        return 'bg-[#b9eeff]';
      case 'Pagado':
        return 'bg-[#68fd58]';
      case 'Devuelto':
        return 'bg-[#5ab3ff]';
      case 'Cancelado':
        return 'bg-[#ff5a5a]';
      default:
        return '';
    }
  }

  numberFormat(value: number): string {
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(value);
  }

}
