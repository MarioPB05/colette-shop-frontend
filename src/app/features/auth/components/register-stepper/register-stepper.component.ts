import {Component, inject, output} from '@angular/core';
import {StepperModule} from 'primeng/stepper';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {CommonModule} from '@angular/common';
import {DatePicker} from 'primeng/datepicker';
import {
  AbstractControl, AsyncValidatorFn,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {InputMask} from 'primeng/inputmask';
import {Password} from 'primeng/password';
import {catchError, debounceTime, map, Observable, of, switchMap} from 'rxjs';
import {AuthService} from '@features/auth/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-stepper',
  imports: [
    StepperModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    DatePicker,
    FormsModule,
    InputMask,
    Password,
    ReactiveFormsModule,
    IconField,
    InputIcon
  ],
  templateUrl: './register-stepper.component.html',
  styles: ``
})
export class RegisterStepperComponent {
  stepperClosed = output<void>();

  authService = inject(AuthService);
  messageService = inject(MessageService);

  activeStep: number = 1;
  maxDate: Date = new Date();
  registerForm = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(15)], [this.usernameExistsValidator()]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string | null>(null, [Validators.required, this.passwordsMatchValidator.bind(this)]),
    name: new FormControl<string | null>(null, [Validators.required]),
    surname: new FormControl<string | null>(null, [Validators.required]),
    birthdate: new FormControl<Date | null>(null, [Validators.required]),
    dni: new FormControl<string | null>(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
  });

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get surname() {
    return this.registerForm.get('surname');
  }

  get birthdate() {
    return this.registerForm.get('birthdate');
  }

  get dni() {
    return this.registerForm.get('dni');
  }

  usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      return of(control.value).pipe(
        debounceTime(500),
        switchMap(username =>
          this.authService.checkUsernameExists(username).pipe(
            map(exists => (exists ? { usernameTaken: true } : null)),
            catchError(() => of({ serverError: true }))
          )
        )
      );
    };
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (!this.registerForm) return null;

    const password = this.registerForm.get('password')?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  getUsernameIconClass(): string {
    const username = this.username;

    if (username?.pending) {
      return 'pi pi-spinner pi-spin';
    }

    if (username?.hasError('serverError')) {
      return 'pi pi-exclamation-triangle text-yellow-500';
    }

    if (username?.hasError('usernameTaken') && username?.dirty) {
      return 'pi pi-times text-red-500';
    }

    if (username?.valid && username?.dirty) {
      return 'pi pi-check text-green-500';
    }

    return 'pi pi-user';
  }

  verifyFirstStep(callback: any) {
    if (this.username?.valid && this.email?.valid && this.password?.valid) {
      callback(2);
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Por favor, rellena los campos correctamente'
    });
  }

}
