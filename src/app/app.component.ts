import {Component, ElementRef, HostListener, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from '@shared/components/loading/loading.component';
import {Toast} from 'primeng/toast';
import {Observable, Subscription} from 'rxjs';
import {LoadingService} from '@core/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnDestroy {
  loading$: Observable<boolean>;
  private subscription!: Subscription;
  clickSoundPlaying = false;

  @ViewChild('clickAnimationElement')
  clickAnimationElement!: ElementRef<HTMLElement>;

  constructor(private loadingService: LoadingService, private renderer: Renderer2) {
    this.loading$ = this.loadingService.loading$;
    this.subscription = this.loading$.subscribe((isLoading) => {
      if (isLoading) {
        this.renderer.addClass(document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
      }
    });
  }

  // On click on docuemnt
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.clickSoundPlaying) {
      return;
    }

    const clickSound = new Audio("/audios/general-effects/menu-click.ogg");
    clickSound.volume = 0.2;
    this.clickSoundPlaying = true;

    clickSound.play().then(() => {
      this.clickSoundPlaying = false;
    });

    this.playClickAnimation(event);
  }

  playClickAnimation(event: MouseEvent) {
    const rippleSize = 70; // Tamaño final del círculo
    const offset = rippleSize / 2;

    // Crear el elemento de la animación
    const ripple = this.clickAnimationElement.nativeElement.cloneNode() as HTMLElement;
    ripple.classList.add('click-effect');

    // Posicionarlo centrado en el cursor
    ripple.style.top = `${event.clientY - offset}px`;
    ripple.style.left = `${event.clientX - offset}px`;

    // Agregar al body o contenedor
    document.body.appendChild(ripple);

    // Eliminar después de la animación
    setTimeout(() => {
      ripple.remove();
    }, 500);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }
}
