import {Component} from '@angular/core';

@Component({
  selector: 'app-cart-btn',
  imports: [],
  templateUrl: './cart-btn.component.html',
  standalone: true,
  styleUrl: '../../brawl_styles.scss'
})
export class CartBtnComponent {
  itemsInCart: number = 0;
}
