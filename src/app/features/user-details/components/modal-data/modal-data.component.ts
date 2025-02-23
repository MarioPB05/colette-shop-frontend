import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Calendar} from 'primeng/calendar';

@Component({
  selector: 'app-modal-data',
  imports: [
    NgIf,
    FloatLabel,
    FormsModule,
    InputText,
    Calendar
  ],
  templateUrl: './modal-data.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class ModalDataComponent {

  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
