import {BoxShopResponse, DailyBoxShopResponse} from '@models/box.model';
import {signal, WritableSignal} from '@angular/core';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: WritableSignal<(BoxShopResponse | DailyBoxShopResponse)[]> = signal([]);

  public getCart(): (BoxShopResponse | DailyBoxShopResponse)[] {
    return this.cart();
  }

  public addToCart(item: BoxShopResponse | DailyBoxShopResponse): void {
    this.cart.update(cart => [...cart, item]);
  }

  public removeAllFromCart(itemId: number): void {
    this.cart.update(cart => cart.filter(cartItem => cartItem.id !== itemId));
  }

  public removeOneFromCart(itemId: number): void {
    const cart = this.cart();
    const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      this.cart.update(() => cart);
    }
  }

  public removeCustomFromCart(itemId: number, quantityRemoved: number): void {
    const cart = this.cart();
    let quantityRemovedCounter = 0;
    while (quantityRemovedCounter < quantityRemoved) {
      this.removeOneFromCart(itemId);
      quantityRemovedCounter++;
    }
  }

  public clearCart(): void {
    this.cart.update(() => []);
  }

  public getTotalPrice(): number {
    return this.cart().reduce((acc, item) => {
      return 'price' in item ? acc + item.price : acc;
    }, 0);
  }

  public getCartItemQuantity(itemId: number): number {
    return this.cart().filter(cartItem => cartItem.id === itemId).length;
  }

  public getCartItemsCount(): number {
    return this.cart().length;
  }
}
