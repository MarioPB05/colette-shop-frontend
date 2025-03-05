import {Component, Input} from '@angular/core';
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
  @Input() gems: number = 0;
}
