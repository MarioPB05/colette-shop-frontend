import { Component } from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-collection-page',
  imports: [
    BrawlHeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './collection-page.component.html',
  standalone: true,
  styleUrl: './../../../shared/brawl_styles.scss',
})
export class CollectionPageComponent {

}
