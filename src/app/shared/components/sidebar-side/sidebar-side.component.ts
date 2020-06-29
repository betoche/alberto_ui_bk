import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from 'app/services/navigation.service';
import { LeftSidebarService } from 'app/services/left-sidebar.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { ILayoutConf, LayoutService } from 'app/shared/services/layout.service';

import { UserSession } from 'app/shared/services/user-session';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public leftSidebarMenuItems: any[];
  public hasIconTypeMenuItem: boolean;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  constructor(
    private leftSidebarService: LeftSidebarService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.leftSidebarMenuItems = this.leftSidebarService.leftSidebarMenuItems;
    this.layoutConf = this.layout.layoutConf;
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
  }

  toggleCollapse() {
    if (this.layoutConf.sidebarCompactToggle) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        // sidebarStyle: "compact",
        sidebarCompactToggle: true
      });
    }
  }
}
