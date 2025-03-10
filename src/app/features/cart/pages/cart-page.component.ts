import {Component, OnInit, ViewChild} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {FaviconService} from '@core/services/favicon.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {BoxCartRequest, BoxCartResponse} from '@models/box.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {BoxTypeImages} from '@core/enums/box.enum';
import {CartService} from '@shared/services/cart.service';
import {BoxService} from '@features/cart/services/box.service';
import {FormsModule} from '@angular/forms';
import {AuthService} from '@features/auth/services/auth.service';
import {UserDetailsService} from '@shared/services/user-details.service';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {PayModalComponent} from '@features/cart/components/pay-modal/pay-modal.component';
import {CreateOrderRequest} from '@models/order.model';
import {OrderService} from '@features/cart/services/order.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-cart-page',
  imports: [
    BrawlHeaderComponent,
    RouterLink,
    NgForOf,
    FormsModule,
    NgIf,
    ConfirmDialog,
    PayModalComponent,
    NgClass
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./../../../shared/brawl_styles.scss'],
})
export class CartPageComponent implements OnInit {

  boxCartList: BoxCartResponse[] = [];
  totalNetPrice: number = 0;
  totalTaxPrice: number = 0;
  totalPrice: number = 0;
  totalCartPrice: number = 0;
  totalItems: number = 0;
  userGemsAmount: number = 0;
  gemsDiscount: number = 0;

  useGems: boolean = true;
  canUseGems: boolean = true;

  requestGift: boolean = false;
  orderIsGift: boolean = false;
  giftUsername: string = '';
  giftButtonDisabled: boolean = false;
  giftUsernameVerified: boolean = false;
  notAvailableUsername: string = '';

  orderId: number = 0;
  showPayModal: boolean = false;

  @ViewChild('payModal') payModal!: PayModalComponent;
  activeStep: number = 1;

  protected readonly BoxTypeImages = BoxTypeImages;

  constructor(
    private router: Router,
    private boxService: BoxService,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private faviconService: FaviconService,
    private messageService: MessageService,
    private userDetailsService: UserDetailsService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.faviconService.changeFavicon('/images/favicon/shop-favicon.png');

    const itemsInCart = this.cartService.getCartItemDictionary();
    const request: BoxCartRequest = { items: [] };

    for (const key in itemsInCart) {
      request.items.push({
        boxId: parseInt(key),
        quantity: itemsInCart[key]
      });
    }

    forkJoin({
      boxesResponse: this.boxService.getCartBoxes(request),
      userDetails: this.userDetailsService.getUserDetails()
    }).subscribe({
      next: ({boxesResponse, userDetails}) => {
        this.boxCartList = boxesResponse;

        this.cartService.clearCart();

        this.boxCartList.forEach((box) => {
          for (let i = 0; i < box.quantity; i++) {
            this.cartService.addToCart(box.id);
          }
        });

        this.totalItems = this.boxCartList.reduce((acc, box) => acc + box.quantity, 0);
        this.totalCartPrice = this.boxCartList.reduce((acc, box) => acc + box.total_price, 0);
        this.totalNetPrice = Math.round((this.totalCartPrice / 1.21) * 100) / 100;

        if (userDetails) {
          this.userGemsAmount = userDetails.gems;

          if (this.useGems) {
            // Calculate gems discount, 100 gems = 1€ only 2 decimals
            this.gemsDiscount = Math.round(this.userGemsAmount * 0.01 * 100) / 100;

            // If the total price is 0 or if we apply the discount with gems the total price is less than 0
            if (this.totalCartPrice <= 0 || this.totalNetPrice - this.gemsDiscount <= 0) {
              this.useGems = false;
            }

            this.canUseGems = this.totalNetPrice - this.gemsDiscount > 0;

            if (this.userGemsAmount > 0 && this.canUseGems) {
              this.totalNetPrice -= this.gemsDiscount;
            }else {
              this.useGems = false;
            }
          }

          this.notAvailableUsername = userDetails.username;
        }

        this.totalTaxPrice = Math.floor((this.totalNetPrice * 0.21) * 100) / 100;
        this.totalPrice = this.totalNetPrice + this.totalTaxPrice;
      },
      error: () => {
        this.router.navigate(['/']).then(() => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de tu carrito'});
        });
      }
    });
  }

  increaseQuantity(box: BoxCartResponse) {
    if (box.boxes_left - box.quantity === 0 || box.is_daily) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No hay más cajas disponibles'});
      return;
    }

    if (box.quantity >= 1000) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No puedes tener más de 1000 cajas de un mismo tipo'});
      return;
    }

    box.quantity++;
    box.total_price = box.quantity * box.price;

    this.totalItems++;
    this.recalculatePrices();
    this.cartService.addToCart(box.id);
  }

  decreaseQuantity(event: Event, box: BoxCartResponse) {
    if (box.quantity > 1) {
      box.quantity--;
      box.total_price = box.quantity * box.price;

      this.totalItems--;

      this.cartService.removeOneFromCart(box.id);

      this.recalculatePrices();

      return;
    }

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de que quieres eliminar esta caja de tu carrito?',
      header: 'Confirmar',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => {
        this.cartService.removeOneFromCart(box.id);
        this.boxCartList = this.boxCartList.filter((b) => b.id !== box.id);
        this.totalItems--;
        this.recalculatePrices();

        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'La caja ha sido eliminada de tu carrito' });
      }
    });
  }

  verifyUsernameForGift() {
    if (this.giftUsername === '') {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor ingresa un nombre de usuario'});
      return;
    }

    if (this.giftButtonDisabled) return;

    this.requestGift = true;
    this.giftButtonDisabled = true;

    if (this.giftUsername.trim() === this.notAvailableUsername) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No puedes enviarte a ti mismo un regalo'});
      this.giftButtonDisabled = false;
      return;
    }

    this.authService.checkUsernameExists(this.giftUsername).subscribe({
      next: (exists) => {
        this.giftUsernameVerified = exists;

        if (exists) {
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'El pedido será enviado a ' + this.giftUsername});
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'El usuario no existe'});
        }

        this.giftButtonDisabled = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo encontrar el usuario'});
        this.giftButtonDisabled = false;
      }
    });
  }

  recalculatePrices() {
    this.totalCartPrice = this.boxCartList.reduce((acc, box) => acc + box.total_price, 0);

    if (this.totalCartPrice <= 0) {
      this.useGems = false;
    }

    this.totalNetPrice = Math.round((this.totalCartPrice / 1.21) * 100) / 100;

    if (this.totalNetPrice - this.gemsDiscount <= 0) {
      this.useGems = false;
      this.canUseGems = false;
    }else {
      this.canUseGems = true;
    }

    if (this.useGems && this.userGemsAmount > 0 && this.canUseGems) {
      this.totalNetPrice -= this.gemsDiscount;
    }

    this.totalTaxPrice = Math.floor((this.totalNetPrice * 0.21) * 100) / 100;
    this.totalPrice = this.totalNetPrice + this.totalTaxPrice;
  }

  createOrder() {
    if (this.boxCartList.length === 0) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No hay cajas en tu carrito'});
      return;
    }

    if (this.orderIsGift && !this.giftUsernameVerified) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor verifica el nombre de usuario'});
      return;
    }

    const itemsInCart = this.cartService.getCartItemDictionary();
    const items: CreateOrderRequest['items'] = [];

    for (const key in itemsInCart) {
      items.push({
        boxId: parseInt(key),
        quantity: itemsInCart[key]
      });
    }

    const request: CreateOrderRequest = {
      items: items,
      useGems: this.useGems,
      isGift: this.orderIsGift,
    }

    if (this.orderIsGift) {
      request.giftUsername = this.giftUsername.trim();
    }

    this.orderService.createOrder(request).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          if (isNaN(Number(response.message))) {
            if (response.message?.split('//')[1] === 'skipPayment') {
              this.payModal.setOrder(Number(response.message.split('//')[0]));

              this.payModal.payOrder(
                () => { this.activeStep = 3; },
                0,
                () => { this.showPayModal = true; }
              );

              return;
            }
          }

          // In this case, the response message is the order id
          this.orderId = Number(response.message);

          this.showPayModal = true;

          return;
        }

        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear el pedido'});
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear el pedido'});
      }
    });
  }

}
