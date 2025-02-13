import { Component } from '@angular/core';
import {Tooltip} from "primeng/tooltip";

@Component({
  selector: 'app-gems-indicator',
    imports: [
        Tooltip
    ],
  templateUrl: './gems-indicator.component.html',
  standalone: true,
  styleUrl: '../../brawl_styles.scss'
})
export class GemsIndicatorComponent {
  gems: number = 0;
}
