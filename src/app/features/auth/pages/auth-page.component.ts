import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {AuthService} from '@features/auth/services/auth.service';
import {AuthService as GlobalAuthService} from '@core/services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {RegisterStepperComponent} from '@features/auth/components/register-stepper/register-stepper.component';
import {Password} from 'primeng/password';
import {UserDetailsService} from '@shared/services/user-details.service';
import {CartService} from '@shared/services/cart.service';

@Component({
  selector: 'app-auth-page',
  imports: [
    NgClass,
    NgIf,
    Card,
    InputText,
    FloatLabel,
    FormsModule,
    ReactiveFormsModule,
    RegisterStepperComponent,
    Password
  ],
  templateUrl: './auth-page.component.html',
  styleUrls: ['../../../shared/brawl_styles.scss', 'auth-page.styles.scss']
})
export class AuthPageComponent {
  loginVisible: boolean = false;
  registerVisible: boolean = false;

  // Login form fields
  username: string = '';
  password: string = '';
  loginSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private globalAuthService: GlobalAuthService,
    private userDetailsService: UserDetailsService,
    private cartService: CartService,
    private router: Router,
    private messageService: MessageService
  ) {}

  cardVisible(): boolean {
    return this.loginVisible || this.registerVisible;
  }

  login() {
    this.loginSubmitted = true;

    const loginError = () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario o contraseña incorrectos'
      });

      this.loginSubmitted = false;
    }

    this.authService.login({username: this.username, password: this.password}).subscribe({
      next: (response) => {
        if (!response.token) {
          loginError();
          return;
        }

        this.globalAuthService.setToken(response.token);
        this.userDetailsService.getUserDetails().subscribe({
          next: (response) => {
            this.userDetailsService.emitNewUserDetails(response);

            this.cartService.clearCart();

            this.router.navigate(['/']).then(() => {
              this.messageService.add({
                severity: 'success',
                summary: '¡Bienvenido!',
                detail: 'Has iniciado sesión correctamente'
              });
            });
          },
          error: () => {
            loginError();
          }
        });
      },
      error: () => {
        loginError();
      },
    });
  }

}
