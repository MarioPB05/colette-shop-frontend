import {Component, inject, OnInit} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {CloseBoxComponent} from '@features/inventory/components/close-box/close-box.component';
import {OpenBoxComponent} from '@features/inventory/components/open-box/open-box.component';
import {InventoryService} from '@features/inventory/service/inventory.service';
import {InventoryModel} from '@models/inventory.model';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-inventory',
  imports: [
    BrawlHeaderComponent,
    CloseBoxComponent,
    OpenBoxComponent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './inventory.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss'],
  standalone: true
})
export class InventoryComponent implements OnInit {

  protected inventories!: InventoryModel[];
  protected openBoxes!: InventoryModel[];
  protected closedBoxes!: InventoryModel[];
  pageLoaded = false;

  private inventoryService: InventoryService = inject(InventoryService);

  ngOnInit() {
    this.inventoryService.getInventory().subscribe(
      inventory => {
        this.inventories = inventory;
        this.openBoxes = this.inventories
          .filter(inventory => inventory.open && inventory.openDate)
          .sort((a, b) => new Date(b.openDate!).getTime() - new Date(a.openDate!).getTime());
        this.closedBoxes = this.inventories.filter(inventory => !inventory.open).sort((a, b) => new Date(b.collectDate).getTime() - new Date(a.collectDate).getTime());
        this.pageLoaded = true;
      }
    );
  }
}
