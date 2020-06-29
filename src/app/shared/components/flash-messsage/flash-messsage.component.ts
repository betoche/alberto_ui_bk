import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flash-messsage',
  templateUrl: './flash-messsage.component.html',
  styleUrls: ['./flash-messsage.component.scss'],
})
export class FlashMesssageComponent implements OnInit {
  @Input('type') type: 'success' | 'info' | 'warning' | 'danger' = 'success';
  @Input('message') message: string = '';
  public iconMap = {
    success: 'verified_user',
    danger: 'highlight_off',
  };
  constructor() {}

  ngOnInit() {}
}
