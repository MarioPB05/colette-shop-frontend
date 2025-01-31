import { Component } from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';

@Component({
  selector: 'app-shop-page',
  imports: [BrawlHeaderComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './../../../../shared/brawl_styles.scss',
  standalone: true
})
export class ShopPageComponent {

}
