import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {StepperModule} from 'primeng/stepper';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import VanillaTilt from 'vanilla-tilt';
import {InputMask} from 'primeng/inputmask';
import {FloatLabel} from 'primeng/floatlabel';
import {Password} from 'primeng/password';
import {OrderService} from '@features/cart/services/order.service';
import {CartService} from '@shared/services/cart.service';

@Component({
  selector: 'app-pay-modal',
  imports: [
    StepperModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    InputMask,
    FloatLabel,
    Password,
  ],
  templateUrl: './pay-modal.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss'],
  styles: ``,
  standalone: true
})
export class PayModalComponent implements AfterViewInit {
  @Input() activeStep: number = 1;
  @Input() orderId: number = 0;
  @Output() updateShowPayModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  observer!: MutationObserver;
  selectedPaymentMethod: string = 'creditCard';

  cardNumber: string = '';
  cardExpiration: string = '';
  cardClient: string = '';
  @ViewChild('debitCard', { static: false }) debitCard!: ElementRef;

  paypalEmail: string = '';
  paypalPassword: string = '';

  bizumNumber: number | null = null;

  paymentSuccess: boolean = false;

  gemsAmount: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {}

  ngAfterViewInit() {
    const targetNode = document.body; // Observa cambios en todo el body o en un contenedor específico

    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const cardElement = document.querySelector('.debit-card') as HTMLElement;
          if (cardElement) {
            VanillaTilt.init(cardElement, {
              max: 25,
              speed: 400,
              glare: true,
              'max-glare': 1
            });
          }
        }
      }
    });

    this.observer.observe(targetNode, { childList: true, subtree: true });
  }

  selectPaymentMethod(creditCard: string) {
    this.selectedPaymentMethod = creditCard;
  }

  getPaymentTitle() {
    switch (this.selectedPaymentMethod) {
      case 'creditCard':
        return 'Tarjeta de crédito/débito';
      case 'paypal':
        return 'Paypal';
      case 'bizum':
        return 'Bizum';
      default:
        return 'Tarjeta de crédito/débito';
    }
  }

  toSecondStep(activateCallback: any) {
    if (this.selectedPaymentMethod !== 'creditCard' && this.selectedPaymentMethod !== 'paypal' && this.selectedPaymentMethod !== 'bizum') {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Selecciona un método de pago válido'});
      return;
    }

    activateCallback(2);
  }

  pay(activateCallback: any) {
    switch (this.selectedPaymentMethod) {
      case 'creditCard':
        this.checkCardPayment(activateCallback);
        break;
      case 'paypal':
        this.checkPaypalPayment(activateCallback);
        break;
      case 'bizum':
        this.checkBizumPayment(activateCallback);
        break;
    }
  }

  checkCardPayment(activateCallback: any) {
    if (this.cardNumber.trim() === '' || this.cardExpiration.trim() === '' || this.cardClient.trim() === '') {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos'});
      return;
    }

    this.payOrder(activateCallback);
  }

  checkPaypalPayment(activateCallback: any) {
    if (this.paypalEmail.trim() === '' || this.paypalPassword.trim() === '') {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos'});
      return;
    }

    this.payOrder(activateCallback);
  }

  checkBizumPayment(activateCallback: any) {
    // And check if the number has 9 digits, remove the spaces and the +34
    if (!this.bizumNumber || this.bizumNumber.toString().split(' ').join('').split('+34').join('').length !== 9) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos'});
      return;
    }

    this.payOrder(activateCallback);
  }

  payOrder(activateCallback: any, errorRateCondition: number = 15, orderPromiseCallback: any = null) {
    const errorRate = Math.random() * 100;

    if (errorRate < errorRateCondition) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Hubo un error al procesar el pago'});
      activateCallback(3);
      return;
    }

    this.paymentSuccess = true;
    this.updateShowPayModal.emit(false);

    this.payOrderPromise(activateCallback).then(() => {
      if (orderPromiseCallback !== null) {
        orderPromiseCallback();
      }
    });
  }

  payOrderPromise(activateCallback: any) {
    return new Promise((resolve, reject) => {
      this.orderService.payOrder(this.orderId).subscribe({
        next: (response) => {
          this.updateShowPayModal.emit(true);

          if (response.status === 'success') {
            // In this case, the response message is the amount of gems that the user obtained
            this.gemsAmount = Number(response.message);

            this.cartService.clearCart();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Pago realizado con éxito'});
          }else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Hubo un error al procesar el pago'});
            this.paymentSuccess = false;
          }

          resolve(true);
          activateCallback(3);
        },
        error: () => {
          this.updateShowPayModal.emit(true);
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Hubo un error al procesar el pago'});
          this.paymentSuccess = false;
          activateCallback(3);

          reject();
        }
      });
    });
  }

  setOrder(orderId: number) {
    this.orderId = orderId;
  }

  getPinImage(): string {
    if (this.paymentSuccess) return '/images/pins/colette_pin.png';

    return '/images/pins/colette_sad_pin.png';
  }

}
