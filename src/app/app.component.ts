import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from '@shared/components/loading/loading.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, Toast],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class AppComponent {
}
