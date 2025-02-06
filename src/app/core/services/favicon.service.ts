import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FaviconService {
  constructor() {}

  changeFavicon(faviconUrl: string) {
    const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = faviconUrl;
    document.head.appendChild(link);
  }
}
