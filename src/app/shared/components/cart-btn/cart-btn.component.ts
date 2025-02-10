import {Component} from '@angular/core';

@Component({
  selector: 'app-cart-btn',
  imports: [],
  templateUrl: './cart-btn.component.html',
  standalone: true,
})
export class CartBtnComponent {
  itemsInCart: number = 0;
}
