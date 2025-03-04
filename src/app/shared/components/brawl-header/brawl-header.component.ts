import {Component, OnDestroy} from '@angular/core';
import {LocalStorageService} from '@shared/services/local-storage.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-brawl-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './brawl-header.component.html',
  standalone: true,
  styleUrl: './../../brawl_styles.scss',
})
export class BrawlHeaderComponent implements OnDestroy{
  canPlayMusic: boolean = false;
  music = new Audio("/audios/menu/brawl-stars-menu-01.ogg");

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
    this.canPlayMusic = this.localStorageService.getItem('canPlayMusic') === 'true';
    if (this.canPlayMusic) {
      this.playMenuMusic();
    }
  }

  ngOnDestroy() {
    this.stopMenuMusic();
  }

  playMenuMusic() {
    this.music.volume = 0.1;
    this.music.loop = true;

    this.music.play().catch(() => {
      this.triggerMusic();
    });
  }

  stopMenuMusic() {
    this.music.pause();
  }

  triggerMusic() {
    this.canPlayMusic = !this.canPlayMusic;
    this.localStorageService.setItem('canPlayMusic', this.canPlayMusic.toString());

    if (this.canPlayMusic) {
      this.playMenuMusic();
      return;
    }

    this.stopMenuMusic();
  }

  getNoteImage() {
    if (this.canPlayMusic) {
      return '/images/icons/music-note.svg';
    }

    return '/images/icons/music-note-off.svg';
  }

  isActive(route: string) {
    if (route === '/') {
      return this.router.url === route;
    }

    return this.router.url.includes(route);
  }
}
