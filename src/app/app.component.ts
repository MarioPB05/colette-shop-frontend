import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from '@shared/components/loading/loading.component';
import {Toast} from "primeng/toast";
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ConfirmationService, MessageService],
  standalone: true,
})
export class AppComponent {
}
