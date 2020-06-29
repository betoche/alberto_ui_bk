import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
}

@Injectable()
export class LeftSidebarService {
  constructor() {}

  leftSidebarMenuItems: IMenuItem[] = [
  ]

  leftSidebarEnabled: Boolean=false;
  leftSidebarEnabledBS = new BehaviorSubject<Boolean>(this.leftSidebarEnabled);

  public toggleLeftSidebarEnabled(value: boolean) {
    this.leftSidebarEnabledBS.next(value);
  }
}
