import {Component, Input} from '@angular/core';
import {BoxShopResponse} from '@models/box.model';

@Component({
  selector: 'app-box-buy-card',
  imports: [],
  templateUrl: './box-buy-card.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss', "./../../../../../styles.scss"],
  standalone: true
})

export class BoxBuyCardComponent {
  gradientByBoxType = {
    "Caja": "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
    "Caja grande": "linear-gradient(90deg, #FF6347 0%, #FF0000 100%)",
    "Megacaja": "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)"
  };

  imageByBoxType : {[key: string]: string} = {
    "Caja": "common-box.png",
    "Caja grande": "big-box.png",
    "Megacaja": "megabox.png",
    "Omegacaja": "omegabox.png"
  }

  @Input() box : BoxShopResponse = {
    id: 1,
    name: 'Box name',
    price: 100,
    type: 'Box type',
    boxesLeft: 4,
    favoriteBrawlersInBox: 3,
    pinned: true,
    popular: true
  };
}
