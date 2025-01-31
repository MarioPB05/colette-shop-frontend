import { Component } from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {Slider} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-shop-page',
  imports: [BrawlHeaderComponent, Slider, FormsModule, InputNumberModule],
  templateUrl: './catalog-page.component.html',
  styleUrl: './../../../../shared/brawl_styles.scss',
  standalone: true
})
export class CatalogPageComponent {
  rangeValues: number[] = [20, 30];
  minimumPrice: number = 20;
  maximumPrice: number = 30;

  onSliderChange(event: any) {
    this.minimumPrice = event.values[0];
    this.maximumPrice = event.values[1];
  }

  minPriceChange(event: any) {
    this.minimumPrice = event.target.value;
  }

  maxPriceChange(event: any) {
    this.maximumPrice = event.target.value;
  }
}
