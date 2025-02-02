import {Component} from '@angular/core';
import {TableModule} from 'primeng/table';
import {TableOrderComponent} from '@dashboard/components/table-order/table-order.component';

@Component({
  selector: 'app-order-page',
  imports: [
    TableModule,
    TableOrderComponent
  ],
  templateUrl: './order-page.component.html',
  styles: ``
})
export class OrderPageComponent {

}
