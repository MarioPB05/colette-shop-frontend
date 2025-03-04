import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {BrawlerUserDetailsResponse, UserBrawler} from '@models/user.model';
import {MessageService} from 'primeng/api';
import {UserService} from '@features/user-details/service/user.service';
import {Router} from '@angular/router';

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

  @Input() brawlers!: UserBrawler[];
  @Input() userBrawler!: UserBrawler;
  @Output() userBrawlerChange: EventEmitter<UserBrawler> = new EventEmitter<UserBrawler>();

  protected selectedBrawler!: UserBrawler;
  private messageService: MessageService = inject(MessageService);
  private userService: UserService = inject(UserService);

  ngOnInit() {
    this.selectedBrawler = this.userBrawler;
  }

  openModal() {
    if (this.brawlers.length > 0) {
      this.selectedBrawler = this.userBrawler;
      this.isOpen = true;
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No tienes brawlers'});
      this.isOpen = false;
    }
  }

  closeModal() {
    this.isOpen = false;
  }

  saveBrawler() {
    this.isOpen = false;
    this.userService.setBrawlerImage(this.selectedBrawler.id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Imagen guardada correctamente'});
        this.userBrawlerChange.emit(this.selectedBrawler);
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha podido guardar la imagen'});
      }
    });
  }
}
