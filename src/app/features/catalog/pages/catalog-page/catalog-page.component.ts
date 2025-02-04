import {Component} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {BoxBuyCardComponent} from '@features/catalog/components/box-buy-card/box-buy-card.component';
import {Slider} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {BoxShopResponse} from '@models/box.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-shop-page',
  imports: [BrawlHeaderComponent, Slider, FormsModule, InputNumberModule, BoxBuyCardComponent, NgForOf],
  templateUrl: './catalog-page.component.html',
  styleUrl: './../../../../shared/brawl_styles.scss',
  standalone: true
})
export class CatalogPageComponent {
  rangeValues: number[] = [20, 30];
  boxList: BoxShopResponse[] = [
    {
      id: 1,
      name: 'Box 1',
      price: 20,
      type: 'Caja',
      boxesLeft: 10,
      favoriteBrawlersInBox: 5,
      pinned: true,
      popular: true
    },
    {
      id: 2,
      name: 'Box 2',
      price: 30.56,
      type: 'Caja grande',
      boxesLeft: 4,
      favoriteBrawlersInBox: 0,
      pinned: false,
      popular: true
    },
    {
      id: 3,
      name: 'Box 3',
      price: 40.99,
      type: 'Caja',
      boxesLeft: 28,
      favoriteBrawlersInBox: 3,
      pinned: false,
      popular: false
    },
    {
      id: 4,
      name: 'Box 4',
      price: 50,
      type: 'Megacaja',
      boxesLeft: 1,
      favoriteBrawlersInBox: 0,
      pinned: true,
      popular: false
    },
    {
      id: 5,
      name: 'Box 5',
      price: 60.99,
      type: 'Omegacaja',
      boxesLeft: 10,
      favoriteBrawlersInBox: 5,
      pinned: false,
      popular: false
    },
  ];


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
