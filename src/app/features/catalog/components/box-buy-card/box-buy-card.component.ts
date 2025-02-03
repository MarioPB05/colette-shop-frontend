import { Component } from '@angular/core';
import {BoxShopResponse} from '@models/box.model';

@Component({
  selector: 'app-box-buy-card',
  imports: [],
  templateUrl: './box-buy-card.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss', "./../../../../../styles.scss"],
  standalone: true
})
export class BoxBuyCardComponent {
  box : BoxShopResponse = {
    id: 1,
    name: 'Box name',
    price: 100,
    type: 'Box type',
    boxesLeft: 4,
    favoriteBrawlersInBox: 3,
    pinned: true,
    popular: true
  }
}
