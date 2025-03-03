import {Component, inject, Input} from '@angular/core';
import {InventoryModel} from '@models/inventory.model';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-close-box',
  imports: [
    NgIf
  ],
  templateUrl: './close-box.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class CloseBoxComponent {

  @Input() inventory!: InventoryModel;

  private router = inject(Router);

  openBox(inventory: InventoryModel) {
    this.router.navigate([`box/${inventory.inventoryId}/open`]).then();
  }

  seeDetails(inventory: InventoryModel) {
    this.router.navigate([`box/${inventory.boxId}`]).then();
  }
}
