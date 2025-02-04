import {Component, OnInit} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {BoxBuyCardComponent} from '@features/catalog/components/box-buy-card/box-buy-card.component';
import {Slider} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {BoxShopResponse} from '@models/box.model';
import {NgForOf} from '@angular/common';
import {BoxService} from '@features/catalog/box.service';

@Component({
  selector: 'app-shop-page',
  imports: [BrawlHeaderComponent, Slider, FormsModule, InputNumberModule, BoxBuyCardComponent, NgForOf],
  templateUrl: './catalog-page.component.html',
  styleUrl: './../../../../shared/brawl_styles.scss',
  standalone: true
})
export class CatalogPageComponent implements OnInit {
  rangeValues: number[] = [20, 30];
  onlyFavorites: boolean = false;
  boxTypeFilter: string = '';

  allBoxes: BoxShopResponse[] = [
    {
      id: 1,
      name: 'Box name',
      price: 1.56,
      type: 'Caja',
      boxesLeft: 4,
      favoriteBrawlersInBox: 3,
      pinned: false,
      popular: true
    },
    {
      id: 2,
      name: 'Box name 2',
      price: 5,
      type: 'Caja grande',
      boxesLeft: 3,
      favoriteBrawlersInBox: 0,
      pinned: false,
      popular: false
    },
    {
      id: 3,
      name: 'Box name 3',
      price: 10,
      type: 'Megacaja',
      boxesLeft: 2,
      favoriteBrawlersInBox: 1,
      pinned: true,
      popular: false
    },
    {
      id: 4,
      name: 'Box name 4',
      price: 20,
      type: 'Omegacaja',
      boxesLeft: 1,
      favoriteBrawlersInBox: 0,
      pinned: true,
      popular: true
    }
  ];
  boxList: BoxShopResponse[] = [];

  constructor(private boxService: BoxService) {}

  ngOnInit() {
    // this.boxService.getShopBoxes().subscribe((boxes: BoxShopResponse[]) => {
    //   this.boxList = boxes;
    // });

    this.boxList = this.allBoxes;
    this.boxList = this.boxList.sort((a, b) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
  }

  filterBoxes() {
    let filterBoxes = this.allBoxes.filter((box) => {
      return (!this.onlyFavorites || box.favoriteBrawlersInBox > 0)
        && (this.boxTypeFilter === '' || box.type === this.boxTypeFilter)
        && (box.price >= this.rangeValues[0] && box.price <= this.rangeValues[1]);
    });

    filterBoxes = filterBoxes.sort((a, b) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
    this.boxList = [...filterBoxes];
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
  }
}
