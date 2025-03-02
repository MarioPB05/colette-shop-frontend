import {Component, effect, ElementRef, Input} from '@angular/core';
import {CartService} from '@shared/services/cart.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart-btn',
  imports: [
    RouterLink
  ],
  templateUrl: './cart-btn.component.html',
  standalone: true,
  styleUrl: '../../brawl_styles.scss'
})
export class CartBtnComponent {
  @Input() transparent: boolean = false;
  @Input() animation: boolean = true;
  itemsInCart: number = 0;
  componentLoaded: boolean = false;
  // animationActive: boolean = false;
  addToCartCount: number = 0;

  lastClickX: number = 0;
  lastClickY: number = 0;

  constructor(private elementRef: ElementRef, private cartService: CartService) {
    document.addEventListener('click', (event) => {
      this.lastClickX = event.clientX;
      this.lastClickY = event.clientY;
    });

    effect(() => {
      if (!this.componentLoaded) {
        this.itemsInCart = this.cartService.getCartItemsCount();
        this.componentLoaded = true;
        return;
      }

      if (!this.canDoAnimation()) {
        this.itemsInCart = this.cartService.getCartItemsCount();
        return;
      }

      if (this.canDoAnimation()) {
        setTimeout(() => {
          this.addToCartAnimation().then(() => {
            this.itemsInCart = this.cartService.getCartItemsCount() - this.addToCartCount;
            })}, 1);
      }
    });
  }

  canDoAnimation(): boolean {
    return this.animation && this.itemsInCart < this.cartService.getCartItemsCount();
  }

  addToCartAnimation(): Promise<void> {
    return new Promise(resolve => {
      this.addToCartCount++;

      // Obtener la imagen de plantilla
      const template = this.elementRef.nativeElement.querySelector('#add-to-cart-animation-template');

      if (!template) {
        resolve();
        return;
      }

      // Crear una copia del icono
      const clone = template.cloneNode(true) as HTMLImageElement;
      clone.style.display = 'block';
      clone.classList.add('animated-item');

      // Usar la última posición del cursor
      clone.style.left = `${this.lastClickX}px`;
      clone.style.top = `${this.lastClickY}px`;

      // Agregar el clon al body
      document.body.appendChild(clone);

      // Obtener la posición del carrito
      const cartIcon = this.elementRef.nativeElement.querySelector('#cart-icon');
      if (cartIcon) {
        const cartRect = cartIcon.getBoundingClientRect();

        // Calcular distancia al carrito
        const deltaX = cartRect.left - this.lastClickX;
        const deltaY = cartRect.top - this.lastClickY;

        // Aplicar variables CSS para animación
        clone.style.setProperty('--x', `${deltaX}px`);
        clone.style.setProperty('--y', `${deltaY}px`);
      }

      // Eliminar la imagen después de la animación
      clone.addEventListener('animationend', () => {
        clone.remove();
        this.addToCartCount--;
        resolve();
      });
    })
  }
}
