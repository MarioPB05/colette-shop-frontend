import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {TableBoxResponse} from '@core/models/box.model';
import {BoxService} from '@dashboard/services/box.service';
import {Button} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-boxes-page',
  imports: [
    TableModule,
    ContextMenuModule,
    Button
  ],
  templateUrl: './boxes-page.component.html',
  styles: ``
})
export class BoxesPageComponent implements OnInit {
  boxes!: TableBoxResponse[];
  selectedBox!: TableBoxResponse | null;
  items!: MenuItem[];

  constructor(private boxService: BoxService) {}

  ngOnInit(): void {
    this.boxService.getTableBoxes().subscribe(boxes => this.boxes = boxes);
    this.items = [
      {
        label: 'Detalles',
        icon: 'pi pi-info-circle'
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil'
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash'
      }
    ];
  }

}
