import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AuthService} from '@features/auth/services/auth.service';
import {APIResponse} from '@models/commons.model';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-verify-page',
  imports: [
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './verify-page.component.html',
  styleUrls: ['../../../../shared/brawl_styles.scss', '../auth-page.styles.scss']
})
export class VerifyPageComponent implements OnInit {
  token!: string;
  showButton = false;
  resultStatus: 'success' | 'error' = 'error';
  title: string = 'Verificación de la Cuenta';
  subtitle: string = 'Por favor, espere mientras se verifica su correo electrónico';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (this.token === '') {
      this.router.navigate(['/']).then();
    }

    this.authService.verifyEmail(this.token).subscribe({
      next: (response) => {
        if (response.status === 'error') return;

        this.showButton = true;
        this.resultStatus = 'success';
        this.title = 'Cuenta Verificada';
        this.subtitle = '¡Tu cuenta ha sido verificada con éxito!';
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Correo verificado correctamente'});
      },
      error: (error) => {
        const response = error.error as APIResponse;

        this.resultStatus = 'error';
        this.title = 'Error al verificar';
        this.subtitle = 'Hubo un error al verificar tu correo electrónico';

        this.messageService.add({severity: 'error', summary: 'Error', detail: response.message || 'Hubo un error al verificar el correo'});
      }
    });
  }
}
