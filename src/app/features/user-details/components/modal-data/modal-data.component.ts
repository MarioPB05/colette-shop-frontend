import {Component, inject, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Calendar} from 'primeng/calendar';
import {UserChangeRequest, UserDetailsResponse} from '@models/user.model';
import {UserService} from '@dashboard/services/user.service';
import {MessageService} from 'primeng/api';

export interface ErrorInterface {
  type: string;
  message: string;
}

@Component({
  selector: 'app-modal-data',
  imports: [
    NgIf,
    FloatLabel,
    FormsModule,
    InputText,
    Calendar,
    NgClass,
  ],
  templateUrl: './modal-data.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class ModalDataComponent implements OnInit {

  @Input() user!: UserDetailsResponse;
  isOpen = false;

  private userService: UserService = inject(UserService);

  protected defaultBirthDate!: Date;
  protected newBirthDate!: Date;
  protected userChange: UserChangeRequest = {
    name: '',
    surname: '',
    birthDate: '',
    dni: '',
    email: ''
  }
  protected errors: { [key: string]: string } = {};

  private messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.resetUserData();
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.resetUserData();
    this.isOpen = false;
  }

  saveChanges() {
    if (this.isLegalAge(this.newBirthDate) || !this.validateDNI(this.userChange.dni) || !this.validateEmail(this.userChange.email)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Hay errores en el formulario'});
      return;
    }

    let newUser: UserChangeRequest = {
      name: this.userChange.name.trim(),
      surname: this.userChange.surname.trim(),
      birthDate: this.newBirthDate.toISOString(),
      dni: this.userChange.dni.trim(),
      email: this.userChange.email.trim()
    }

    this.userService.setUserChanges(newUser).subscribe({
      next: () => {
        this.isOpen = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se han podido guardar los cambios'});
      }
    });
  }

  resetUserData() {
    this.defaultBirthDate = new Date(this.user.birthDate);
    this.newBirthDate = new Date(this.user.birthDate);
    this.userChange.name = this.user.name;
    this.userChange.surname = this.user.surname;
    this.userChange.birthDate = this.user.birthDate;
    this.userChange.dni = this.user.dni;
    this.userChange.email = this.user.email;
  }

  isLegalAge(date: Date): boolean {
    if (!date) {
      this.addError('birthdate', 'Debes ser mayor de edad');
      return true;
    }
    const age = new Date().getFullYear() - date.getFullYear();
    if (age < 18) {
      this.addError('birthdate', 'Debes ser mayor de edad');
      return true;
    }
    return false;
  }

  validateDNI(dni: string): boolean {
    const dniPattern = /^\d{8}[a-zA-Z]$/;
    if (!dniPattern.test(dni)) {
      this.addError('dni', 'El dni no es válido');
      return false;
    }
    return true;
  }

  validateEmail(email: string): boolean {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      this.addError('email', 'El email no es válido');
      return false;
    }
    return true;
  }

  addError(type: string, message: string) {
    this.errors[type] = message;
  }
}
