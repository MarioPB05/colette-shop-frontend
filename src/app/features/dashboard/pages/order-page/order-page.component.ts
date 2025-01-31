import {Component, inject} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TableBrawlerResponse} from '@core/models/brawler.model';
import {BrawlerService} from '@dashboard/services/brawler.service';
import {TableOrderComponent} from '@dashboard/components/table-order/table-order.component';

@Component({
  selector: 'app-order-page',
  imports: [
    IconField,
    InputIcon,
    InputText,
    PrimeTemplate,
    TableModule,
    TableOrderComponent
  ],
  templateUrl: './order-page.component.html',
  styles: ``
})
export class OrderPageComponent {

}
