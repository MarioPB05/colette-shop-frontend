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
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {BoxTypeImages} from '@core/enums/box.enum';
import {NgClass, NgIf} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-boxes-page',
  imports: [
    TableModule,
    ContextMenuModule,
    Button,
    Menu,
    ConfirmDialogComponent,
    IconField,
    InputIcon,
    InputText,
    NgClass,
    NgIf,
    Tooltip
  ],
  templateUrl: './boxes-page.component.html',
  styles: ``
})
export class BoxesPageComponent implements OnInit {
  boxes: TableBoxResponse[] = [];
  protected filterBoxes: TableBoxResponse[] = [];
  protected originalBoxes: TableBoxResponse[] = [];
  selectedBox!: TableBoxResponse | null;
  items!: MenuItem[];


  @ViewChild('menu') menu!: Menu;

  protected readonly BoxTypeImages = BoxTypeImages;

  constructor(
    private router: Router,
    private boxService: BoxService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.boxService.getTableBoxes().subscribe({
      next: boxes => {
        this.boxes = boxes;
        this.originalBoxes = boxes;
      }
    });

    this.actualizeItems();

    this.originalBoxes = this.boxes;
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

    this.router.navigate(['/dashboard/box', box.id, 'edit']);
  }

  seeBoxDetails(box: TableBoxResponse | null): void {
    if (!box) return;

    this.router.navigate(['/box', box.id]);
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

  filterOrderForName($event: any) {
    this.filterBoxes = this.originalBoxes.filter(box => box.name.toLowerCase().includes($event.target.value.toLowerCase().trim()));
    this.boxes = this.filterBoxes;
  }

  numberFormat(value: number): string {
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(value);
  }

  protected readonly console = console;

  actualizeItems(): void {
    this.items = [
      {
        label: 'Detalles',
        icon: 'pi pi-info-circle',
        command: () => this.seeBoxDetails(this.selectedBox)
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.editBox(this.selectedBox)
      },
      {
        label: !this.selectedBox?.pinned ? 'Fijar' : 'Desfijar',
        icon: !this.selectedBox?.pinned ? 'pi pi-thumbtack' : 'pi pi-times',
        command: () => this.togglePinBox(this.selectedBox)
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.deleteBox(this.selectedBox)
      }
    ];
    console.log(this.items)
    console.log(this.selectedBox)
  }

  private togglePinBox(selectedBox: TableBoxResponse | null) {
    if (!selectedBox) return;

    if (selectedBox.pinned) {
      this.boxService.unpinBox(selectedBox.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Caja desfijada',
            detail: `La caja "${selectedBox.name}" ha sido desfijada`
          });
          selectedBox.pinned = false;
          this.actualizeItems();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `No se ha podido desfijar la caja "${selectedBox.name}"`
          });
        }
      });
    } else {
      this.boxService.pinBox(selectedBox.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Caja fijada',
            detail: `La caja "${selectedBox.name}" ha sido fijada`
          });
          selectedBox.pinned = true;
          this.actualizeItems();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `No se ha podido fijar la caja "${selectedBox.name}"`
          });
        }
      });
    }
  }
}
