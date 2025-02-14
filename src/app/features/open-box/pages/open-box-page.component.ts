import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FaviconService} from '@core/services/favicon.service';

type pageTypes = 'open-box' | 'new-brawler' | 'duplicate-brawler';

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
  actualPage: pageTypes = 'open-box';

  constructor(private  faviconService: FaviconService) {}

  ngOnInit() {
    this.faviconService.changeFavicon("/images/favicon/box-favicon.png");
    this.pageLoaded = true;
  }

  showFlash(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.flashVisible = true;
      setTimeout(() => {
        resolve();
      }, 300);
    })
  }

  openBox() {
    this.showFlash().then(() => {
      this.actualPage = 'duplicate-brawler';
      console.log(this.actualPage);
    });
  }

  getParentActualPageClasses() {
    if (this.actualPage == 'duplicate-brawler') {
      return 'bg-gradient-radial via-brawl-purple to-brawl-purple from-purple-500';
    }

    return 'bg-gradient-radial via-brawl-dark-blue to-brawl-dark-blue from-brawl-blue';
  }
}
