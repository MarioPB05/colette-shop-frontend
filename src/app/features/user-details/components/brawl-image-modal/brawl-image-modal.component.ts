import {Component, Input, OnInit} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {BrawlerUserDetailsResponse} from '@models/user.model';

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

  @Input() brawlers!: BrawlerUserDetailsResponse[];
  @Input() userBrawler!: BrawlerUserDetailsResponse;

  selectedBrawler: BrawlerUserDetailsResponse | undefined;

  ngOnInit() {
    this.selectedBrawler = this.userBrawler;
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

}
