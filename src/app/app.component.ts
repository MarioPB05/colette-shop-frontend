import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from '@shared/components/loading/loading.component';
import {Toast} from "primeng/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
}
