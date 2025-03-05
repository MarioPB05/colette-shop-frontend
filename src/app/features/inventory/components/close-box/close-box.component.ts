import {Component, inject, Input} from '@angular/core';
import {InventoryModel} from '@models/inventory.model';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {BoxTypeImages} from '@core/enums/box.enum';


@Component({
  selector: 'app-close-box',
  imports: [
    NgIf
  ],
  templateUrl: './close-box.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss'],
  standalone: true
})
export class CloseBoxComponent {
  @Input() inventory!: InventoryModel;
  private router = inject(Router);
  protected readonly BoxTypeImages = BoxTypeImages;

  gradientByBoxType : {[key: string]: string} = {
    "Caja": "from-[#3DE2FB] to-[#1375FF]",
    "Caja grande": "from-[#fbb9ff] to-[#f230ff]",
    "Megacaja": "from-[#FFFFFF] to-[#FFD700]",
    "Omegacaja": "from-[#ffed7b] to-[#ff1616]"
  };

  openBox(inventory: InventoryModel) {
    this.router.navigate([`box/${inventory.inventoryId}/open`]).then();
  }

  seeDetails(inventory: InventoryModel) {
    this.router.navigate([`box/${inventory.boxId}`]).then();
  }
}
