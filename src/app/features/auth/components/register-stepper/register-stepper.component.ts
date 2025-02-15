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
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {InputMask} from 'primeng/inputmask';
import {Password} from 'primeng/password';
import {catchError, debounceTime, map, Observable, of, switchMap} from 'rxjs';
import {AuthService} from '@features/auth/services/auth.service';
import { MessageService } from 'primeng/api';

const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};

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
    confirmPassword: new FormControl<string | null>(null, [Validators.required]),
    name: new FormControl<string | null>(null, [Validators.required]),
    surname: new FormControl<string | null>(null, [Validators.required]),
    birthdate: new FormControl<Date | null>(null, [Validators.required, this.birthdateValidator()]),
    dni: new FormControl<string | null>(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), this.dniValidator()])
  }, { validators: passwordsMatchValidator });

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

  birthdateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthdate = control.value;
      if (!birthdate) return null;

      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18);

      return birthdate <= minDate ? null : { tooYoung: true };
    };
  }

  dniValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let dni = control.value?.toUpperCase();

      if (dni?.includes('-')) {
        dni = dni.replace('-', '');
      }

      if (!dni) return null;

      const dniRegex = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
      const letterMap = "TRWAGMYFPDXBNJZSQVHLCKE";

      if (!dniRegex.test(dni)) return {invalidDni: true};

      const numberPart = parseInt(dni.slice(0, 8), 10);
      const letter = dni[8];

      return letter === letterMap[numberPart % 23] ? null : {invalidDni: true};
    }
  };

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
    if (this.username?.valid && this.email?.valid && this.password?.valid && this.confirmPassword?.valid && !this.registerForm.hasError('passwordMismatch')) {
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
