import {Component, inject, Input} from '@angular/core';
import {InventoryModel} from '@models/inventory.model';
import {Router} from '@angular/router';
import {BoxTypeImages} from '@core/enums/box.enum';

@Component({
  selector: 'app-open-box',
  imports: [],
  templateUrl: './open-box.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss'],
  standalone: true
})
export class OpenBoxComponent {

  @Input() inventory!: InventoryModel;

  private router = inject(Router);
  protected readonly BoxTypeImages = BoxTypeImages;

  dateFormatted(date: string): string {
    const givenDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (givenDate.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    }

    if (givenDate.toDateString() === today.toDateString()) {
      return 'Hoy';
    }

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return givenDate.toLocaleDateString('es-ES', options);
  }

  seeResume(inventory: InventoryModel) {
    this.router.navigate([`box/${inventory.inventoryId}/resume`]).then();
  }
}
