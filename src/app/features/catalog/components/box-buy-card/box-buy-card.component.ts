import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BoxShopResponse} from '@models/box.model';

@Component({
  selector: 'app-box-buy-card',
  imports: [],
  templateUrl: './box-buy-card.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss', "./../../../../../styles.scss"],
  standalone: true
})

export class BoxBuyCardComponent {
  gradientByBoxType : {[key: string]: string} = {
    "Caja": "from-[#3DE2FB] to-[#1375FF]",
    "Caja grande": "from-[#fbb9ff] to-[#f230ff]",
    "Megacaja": "from-[#FFFFFF] to-[#FFD700]",
    "Omegacaja": "from-[#ffed7b] to-[#ff1616]"
  };

  headerByBoxType : {[key: string]: string} = {
    "Caja": "bg-[#1375FF]",
    "Caja grande": "bg-[#f230ff]",
    "Megacaja": "bg-[#FFD700]",
    "Omegacaja": "bg-[#ff1616]"
  }

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

  @Output() addToCart = new EventEmitter<BoxShopResponse>();

  addBoxToCart() {
    this.addToCart.emit(this.box);
  }
}
