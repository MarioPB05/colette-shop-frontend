import {Component} from '@angular/core';
import {StepperModule} from 'primeng/stepper';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToggleButton} from 'primeng/togglebutton';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pay-modal',
  imports: [
    StepperModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './pay-modal.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss'],
  styles: ``
})
export class PayModalComponent {
  activeStep: number = 1;
  selectedPaymentMethod: string = 'creditCard';

  selectPaymentMethod(creditCard: string) {
    this.selectedPaymentMethod = creditCard;
  }

  getPaymentIcon() {
    switch (this.selectedPaymentMethod) {
      case 'creditCard':
        return 'pi-credit-card';
      case 'paypal':
        return 'pi-paypal';
      case 'bizum':
        return 'pi-phone';
      default:
        return 'pi-credit-card';
    }
  }

}
