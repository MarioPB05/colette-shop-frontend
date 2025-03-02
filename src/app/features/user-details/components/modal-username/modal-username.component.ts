import { Component } from '@angular/core';
import {Calendar} from "primeng/calendar";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-modal-username',
    imports: [
        Calendar,
        FloatLabel,
        InputText,
        NgIf
    ],
  templateUrl: './modal-username.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class ModalUsernameComponent {

  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

}
