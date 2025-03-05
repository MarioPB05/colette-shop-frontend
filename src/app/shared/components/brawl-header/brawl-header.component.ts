import {Component, OnDestroy, ViewChild} from '@angular/core';
import {LocalStorageService} from '@shared/services/local-storage.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {UserDetailsService} from '@shared/services/user-details.service';
import {AuthService} from '@core/services/auth.service';
import {MenuItem} from 'primeng/api';
import {TieredMenu} from 'primeng/tieredmenu';

@Component({
  selector: 'app-brawl-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgIf,
    AsyncPipe,
    TieredMenu
  ],
  templateUrl: './brawl-header.component.html',
  standalone: true,
  styleUrl: './../../brawl_styles.scss',
})
export class BrawlHeaderComponent implements OnDestroy{
  canPlayMusic: boolean = false;
  music = new Audio("/audios/menu/brawl-stars-menu-01.ogg");
  userItems: MenuItem[] = [
    {
      label: 'Mi perfil',
      icon: 'pi pi-fw pi-user',
      routerLink: '/user/details'
    }
  ];

  loadUserItems: boolean = false;

  @ViewChild('menu') tieredMenu!: TieredMenu;

  constructor(
    private router: Router,
    private authService: AuthService,
    protected userDetailsService: UserDetailsService,
    private localStorageService: LocalStorageService,
  ) {
    this.canPlayMusic = this.localStorageService.getItem('canPlayMusic') === 'true';
    if (this.canPlayMusic) {
      this.playMenuMusic();
    }

    this.authService.isAdministrator().subscribe((isAdmin) => {
      if (isAdmin) {
        this.userItems.push({
          label: 'Administración',
          icon: 'pi pi-fw pi-cog',
          routerLink: '/dashboard'
        });
      }

      this.userItems.push({
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.authService.logout()
      });

      this.loadUserItems = true;
    });
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

  toggleMenu($event: any) {
    this.tieredMenu.toggle($event);
  }

}
