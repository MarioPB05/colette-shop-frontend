import { Component } from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-brawl-image-modal',
  imports: [
    FloatLabel,
    InputText,
    NgIf
  ],
  templateUrl: './brawl-image-modal.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class BrawlImageModalComponent {

  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

}
