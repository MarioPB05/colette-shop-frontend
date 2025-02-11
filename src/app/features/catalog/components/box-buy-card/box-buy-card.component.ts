import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoxShopResponse} from '@models/box.model';
import {NgIf} from '@angular/common';
import {BoxTypeImages} from '@core/enums/box.enum';
import {Router} from '@angular/router';
import {Tooltip} from 'primeng/tooltip';
import {CartService} from '@shared/services/cart.service';

@Component({
  selector: 'app-box-buy-card',
  imports: [
    NgIf,
    Tooltip
  ],
  templateUrl: './box-buy-card.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss', "./../../../../../styles.scss"],
  standalone: true
})

export class BoxBuyCardComponent implements OnInit {
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

  @Input() box!: BoxShopResponse;

  constructor(private router: Router, private cartService: CartService) {
  }

  ngOnInit() {
    const itemsInCart = this.cartService.getCartItemQuantity(this.box.id);

    if (this.box.boxes_left != -1) {
      this.box.boxes_left -= itemsInCart;
    }
  }

  addBoxToCart() {
    if (this.box.boxes_left != 0) {
      this.box.boxes_left--;
      this.cartService.addToCart(this.box);
    }
  }

  goToBoxDetails() {
    this.router.navigate([`/box/${this.box.id}`]);
  }

  protected readonly BoxTypeImages = BoxTypeImages;
}
