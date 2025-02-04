import {Component, OnInit, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {TableBoxResponse} from '@core/models/box.model';
import {BoxService} from '@dashboard/services/box.service';
import {Button} from 'primeng/button';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import {Menu} from 'primeng/menu';
import {ConfirmDialogComponent} from '@dashboard/components/confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-boxes-page',
  imports: [
    TableModule,
    ContextMenuModule,
    Button,
    Menu,
    ConfirmDialogComponent
  ],
  templateUrl: './boxes-page.component.html',
  styles: ``
})
export class BoxesPageComponent implements OnInit {
  boxes!: TableBoxResponse[];
  selectedBox!: TableBoxResponse | null;
  items!: MenuItem[];

  @ViewChild('menu') menu!: Menu;

  constructor(
    private router: Router,
    private boxService: BoxService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

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
        icon: 'pi pi-trash',
        command: () => this.deleteBox(this.selectedBox)
      }
    ];
  }

  openActionsMenu(event: Event, box: TableBoxResponse): void {
    this.menu.toggle(event);
    this.selectedBox = box;
  }

  createBox(): void {
    this.router.navigate(['/dashboard/box/create']);
  }

  editBox(box: TableBoxResponse | null): void {
    if (!box) return;

    this.router.navigate(['/dashboard/boxes', box.id]);
  }

  deleteBox(box: TableBoxResponse | null): void {
    if (!box) return;

    this.confirmationService.confirm({
      message: 'Estás seguro de que quieres eliminar esta caja?',
      header: 'Eliminar caja',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
      },
      acceptButtonProps: {
        label: 'Eliminar',
      },
      accept: () => {
        this.boxService.removeBox(box.id).subscribe({
          next: () => {
            this.boxes = this.boxes.filter(b => b.id !== box.id);
            this.messageService.add({severity: 'success', summary: 'Caja eliminada', detail: `La caja "${box.name}" ha sido eliminada`});
          },
          error: () => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: `No se ha podido eliminar la caja "${box.name}"`});
          }
        });
      }
    });
  }

}
