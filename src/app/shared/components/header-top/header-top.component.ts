import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { NavigationService } from 'app/services/navigation.service';
import { Subscription } from 'rxjs';
import { UserSession } from 'app/shared/services/user-session';
import { ApplicationBaseComponent } from 'app/shared/components/application.base.component';
import { Router } from '@angular/router';
import { ThemeService } from '../../../shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
})
export class HeaderTopComponent extends ApplicationBaseComponent implements OnInit, OnDestroy {
  layoutConf: any;
  menuItems: any;
  menuItemSub: Subscription;
  topbarLinks: any;
  topbarLinksub: Subscription;

  egretThemes: any[] = [];
  currentLang = 'es';
  @Input() notificPanel;
  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    public translate: TranslateService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.egretThemes;
    this.menuItemSub = this.navService.menuItems$.subscribe((res) => {
      res = res.filter((item) => item.type === 'link');
      let limit = 4;
      let mainItems: any[] = res.slice(0, limit);
      if (res.length <= limit) {
        return (this.menuItems = mainItems);
      }
      let subItems: any[] = res.slice(limit, res.length - 1);
      mainItems.push({
        name: 'More',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems,
      });
      this.menuItems = mainItems;
    });

    this.topbarLinksub = this.navService.menuItems$.subscribe((res) => {
      res = res.filter((item) => item.type === 'topbar-links');
      this.topbarLinks = res;
    });
  }
  ngOnDestroy() {
    this.menuItemSub.unsubscribe();
    this.topbarLinksub.unsubscribe();
  }
  signOut() {
    UserSession.removeCurrentUser();
    this.router.navigate(['/sessions/sign_in']);
  }
  changeTheme(theme) {
    this.layout.publishLayoutChange({ matTheme: theme.name });
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed',
    });
  }
}
