import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {MenuItem, MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {DatePipe, NgClass} from '@angular/common';
import {TableOrderResponse} from '@core/models/order.model';
import {OrderService} from '@dashboard/services/order.service';
import {Tooltip} from 'primeng/tooltip';
import {ContextMenu} from 'primeng/contextmenu';
import {Menu} from 'primeng/menu';
import {Button} from 'primeng/button';
import {ActivatedRoute, Router} from '@angular/router';

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
    Tooltip,
    ContextMenu,
    Menu,
    Button
  ],
  templateUrl: './table-order.component.html',
  styles: ``
})
export class TableOrderComponent implements OnInit {
  protected orders: TableOrderResponse[] = [];
  private orderFilter: TableOrderResponse[] = [];
  private orderOriginal: TableOrderResponse[] = [];
  protected selectedOrder: TableOrderResponse | null | undefined;
  private brawlTag: string = '';

  private orderService = inject(OrderService);
  private messageService: MessageService = inject(MessageService);
  private router = inject(Router);

  @ViewChild('menu') menu!: Menu;

  items!: MenuItem[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.brawlTag = this.route.snapshot.paramMap.get('brawlTag')! ?? 'all';

    this.orderService.getAllOrder(this.brawlTag).subscribe({
      next: brawlers => {
        for (const brawler of brawlers) {
          this.orders.push(brawler);
          this.orderOriginal.push(brawler);
        }
      },
     error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar los pedidos'});
     }
    });

  }

  filterOrderForInvoiceNumber(event: any): void {
    this.orderFilter = this.orderOriginal.filter(order => order.invoice_number.toLowerCase().includes(event.target.value.toLowerCase().trim()));
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

  openActionsMenu(event: Event, order: TableOrderResponse): void {
    this.menu.toggle(event);
    this.selectedOrder = order;

    this.items = [
      {
        label: 'Ver detalles',
        icon: 'pi pi-fw pi-search',
        command: () => this.router.navigate([`/dashboard/orders/${order.id}`])
      }
    ];
  }

}
