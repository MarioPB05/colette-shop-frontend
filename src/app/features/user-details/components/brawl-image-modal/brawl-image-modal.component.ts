import {Component, OnInit} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-brawl-image-modal',
  imports: [
    NgIf,
    Select,
    FormsModule
  ],
  templateUrl: './brawl-image-modal.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class BrawlImageModalComponent implements OnInit {

  isOpen = false;

  brawlers: any[] | undefined;

  selectedBrawler: string | undefined;

  ngOnInit() {
    this.brawlers = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

}
