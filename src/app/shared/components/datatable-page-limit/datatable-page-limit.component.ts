import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'datatable-page-limit',
  templateUrl: './datatable-page-limit.component.html',
  styleUrls: ['./datatable-page-limit.component.scss'],
})
export class DatatablePageLimitComponent implements OnInit {
  @Input() limit: string;
  @Output() limitChange: EventEmitter<string> = new EventEmitter<string>();

  public listOfLimits: any = [
    10, 25, 50, 100
  ];

  changeValue() {
    this.limitChange.emit(this.limit);
  }

  constructor() {}

  ngOnInit() {}
}
