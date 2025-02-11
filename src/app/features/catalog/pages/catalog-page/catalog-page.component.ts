import {Component, ElementRef, OnInit} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {BoxBuyCardComponent} from '@features/catalog/components/box-buy-card/box-buy-card.component';
import {Slider} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {BoxShopResponse, DailyBoxShopResponse} from '@models/box.model';
import {NgForOf, NgIf} from '@angular/common';
import {BoxService} from '@features/catalog/services/box.service';
import {Tooltip} from 'primeng/tooltip';
import {FaviconService} from '@core/services/favicon.service';
import {
  BoxFreeDailyBuyCardComponent
} from '@features/catalog/components/box-free-daily-buy-card/box-free-daily-buy-card.component';
import {MessageService} from 'primeng/api';
import {CartBtnComponent} from '@shared/components/cart-btn/cart-btn.component';
import {BoxTypes} from '@core/enums/box.enum';

@Component({
  selector: 'app-shop-page',
  imports: [BrawlHeaderComponent, Slider, FormsModule, InputNumberModule, BoxBuyCardComponent, NgForOf, NgIf, Tooltip, BoxFreeDailyBuyCardComponent, CartBtnComponent],
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss'],
  standalone: true
})
export class CatalogPageComponent implements OnInit {
  filteredBoxTypes: string[] = ['Todos', ...BoxTypes];

  itemsInCart: (BoxShopResponse | DailyBoxShopResponse)[] = [];
  gems: number = 0;

  rangeValues: number[] = [0, 50];
  onlyFavorites: boolean = false;
  boxTypeFilter: number = 0;

  boxesLoaded: boolean = false;
  allBoxes: BoxShopResponse[] = [];
  allDailyFreeBoxes: DailyBoxShopResponse[] = [];

  boxList: BoxShopResponse[] = [];
  freeDailyBoxList: DailyBoxShopResponse[] = [];

  constructor(
    private boxService: BoxService,
    private faviconService: FaviconService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.faviconService.changeFavicon('/images/favicon/shop-favicon.png');

    this.boxService.getBoxes().subscribe({
      next: (boxes) => {
        this.allBoxes = boxes.shopBoxes;
        this.allDailyFreeBoxes = boxes.freeDailyBoxes;
        this.boxList = this.allBoxes;
        this.freeDailyBoxList = this.allDailyFreeBoxes;
        this.boxList = this.boxList.sort((a, b) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
        this.filterBoxes();
        this.syncBoxesLeftWithCart();
        this.boxesLoaded = true;
      }, error: (error) => {
        this.boxesLoaded = true;
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las cajas'});
      }
    });
  }

  syncBoxesLeftWithCart() {
    const itemsInCartIds = this.itemsInCart.map((item) => item.id);
    this.allBoxes.forEach((box) => {
      box.boxes_left -= itemsInCartIds.filter((id) => id === box.id).length;
    });
    this.boxList = [...this.allBoxes];

    this.allDailyFreeBoxes.forEach((box) => {
      box.claimed = itemsInCartIds.includes(box.id);
    });
    this.freeDailyBoxList = [...this.allDailyFreeBoxes];
  }

  filterBoxes() {
    let filterBoxes = this.allBoxes.filter((box) => {
      return (!this.onlyFavorites || box.favorite_brawlers_in_box > 0)
        && (this.boxTypeFilter === 0 || box.type === BoxTypes[this.boxTypeFilter - 1])
        && (box.price >= this.rangeValues[0] && box.price <= this.rangeValues[1]);
    });

    let filterFreeBoxes = this.allDailyFreeBoxes.filter((box) => {
      return (!this.onlyFavorites || box.favorite_brawlers_in_box > 0)
        && (this.boxTypeFilter === 0 || box.type === BoxTypes[this.boxTypeFilter - 1])
        && this.rangeValues[0] === 0;
    });

    filterBoxes = filterBoxes.sort((a, b) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
    this.boxList = [...filterBoxes];
    this.freeDailyBoxList = [...filterFreeBoxes];
  }

  onBoxTypeClick() {
    this.boxTypeFilter += 1;
    if (this.boxTypeFilter >= this.filteredBoxTypes.length) {
      this.boxTypeFilter = 0;
    }
    this.filterBoxes();
  }

  extractOnlyNumbers(str: string): number {
    const cleanedStr = str.replace(/(?<=\d)[.,](?=\d{3}(?:[.,]|$))/g, "");
    const normalizedStr = cleanedStr.replace(/[,\.](?=\d{1,2}$)/, ".");
    const num = parseFloat(normalizedStr);
    return isNaN(num) ? 0 : num;
  }

  swapSliderValues() {
    const temp = this.rangeValues[0];
    this.rangeValues[0] = this.rangeValues[1];
    this.rangeValues[1] = temp;
    this.rangeValues = [...this.rangeValues];
  }

  minPriceChange($event: KeyboardEvent) {
    const value = this.extractOnlyNumbers(($event.target as HTMLInputElement).value);

    if (value > 50) {
      this.rangeValues[0] = 50;
    }else {
      this.rangeValues[0] = value;
    }

    if (this.rangeValues[0] > this.rangeValues[1]) {
      this.swapSliderValues();
    }

    this.rangeValues = [...this.rangeValues];
    this.filterBoxes();
  }

  maxPriceChange($event: KeyboardEvent) {
    const value = this.extractOnlyNumbers(($event.target as HTMLInputElement).value);

    if (value > 50) {
      this.rangeValues[1] = 50;
    }else {
      this.rangeValues[1] = value;
    }

    if (this.rangeValues[0] > this.rangeValues[1]) {
      this.swapSliderValues();
    }

    this.rangeValues = [...this.rangeValues];
    this.filterBoxes();
  }
}
