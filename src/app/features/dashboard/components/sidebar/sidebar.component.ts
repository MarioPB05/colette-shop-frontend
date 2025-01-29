import { Component } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {BadgeModule} from 'primeng/badge';
import {RippleModule} from 'primeng/ripple';
import {AvatarModule} from 'primeng/avatar';
import {MenuItem} from 'primeng/api';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, NgIf],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {
        label: 'Documents',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            shortcut: '⌘+N'
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S'
          }
        ]
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+O'
          },
          {
            label: 'Messages',
            icon: 'pi pi-inbox',
            badge: '2'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q'
          }
        ]
      },
      {
        separator: true
      }
    ];
  }
}
