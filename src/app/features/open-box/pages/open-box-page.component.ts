import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-open-box-page',
  imports: [
    NgIf
  ],
  templateUrl: './open-box-page.component.html',
  standalone: true,
  styleUrls: ['./../../../shared/brawl_styles.scss'],
})
export class OpenBoxPageComponent implements OnInit{
  pageLoaded = false;
  flashVisible = false;

  ngOnInit() {
    this.pageLoaded = true;
  }

  showFlash() {
    this.flashVisible = true;
    setTimeout(() => {
      this.flashVisible = false;
    }, 500);
  }
}
