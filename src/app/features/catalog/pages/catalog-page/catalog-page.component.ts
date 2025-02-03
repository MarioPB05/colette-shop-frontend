import {Component} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {BoxBuyCardComponent} from '@features/catalog/components/box-buy-card/box-buy-card.component';
import {Slider} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-shop-page',
  imports: [BrawlHeaderComponent, Slider, FormsModule, InputNumberModule, BoxBuyCardComponent],
  templateUrl: './catalog-page.component.html',
  styleUrl: './../../../../shared/brawl_styles.scss',
  standalone: true
})
export class CatalogPageComponent {
  rangeValues: number[] = [20, 30];

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
