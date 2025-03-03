import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
  activeStep: number = 1;
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

  constructor(private messageService: MessageService) {}

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
            this.observer.disconnect(); // Deja de observar después de encontrar el elemento
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
    this.payOrder(activateCallback);
  }

  payOrder(activateCallback: any) {
    const errorRate = Math.random() * 100;

    if (errorRate < 15) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Hubo un error al procesar el pago'});
      activateCallback(3);
      return;
    }

    this.paymentSuccess = true;


    // TODO: CALL BACKEND TO UPDATE ORDER STATUS

    activateCallback(3);
  }

  getPinImage(): string {
    if (this.paymentSuccess) return '/images/pins/colette_pin.png';

    return '/images/pins/colette_sad_pin.png';
  }

}
