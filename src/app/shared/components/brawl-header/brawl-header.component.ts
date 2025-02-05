import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-brawl-header',
  imports: [
    RouterLink
  ],
  templateUrl: './brawl-header.component.html',
  standalone: true,
  styleUrl: './../../brawl_styles.scss',
})
export class BrawlHeaderComponent {

}
