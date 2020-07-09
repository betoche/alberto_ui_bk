import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'flash-messsage-auto-hide',
  templateUrl: './flash-messsage-auto-hide.component.html',
  styleUrls: ['./flash-messsage-auto-hide.component.scss'],
})
export class FlashMesssageAutoHideComponent implements OnInit {
  @Input('preventHide') preventHide: boolean = false;

  public _options: any = {};
  public isShown: boolean = true;
  public timeoutIsShown: any;
  public iconMap = {
    success: 'verified_user',
    danger: 'highlight_off',
  };

  @Input()
  set options(data){
    this._options = data;

    this.isShown = true;

    if(!this.preventHide){
      clearTimeout(this.timeoutIsShown);
      this.timeoutIsShown = setTimeout( ()=>{
        this.isShown = false;
      }, 5000 ); // auto hide this message after 5 seconds
    }

    if(this._options['scrollToTop']){
      document.querySelector('#rightside-content-hold').scroll(
        { top: 0, left: 0, behavior: 'smooth' }
      );
    }
  }

  get options(){ return this._options }

  constructor() {}

  ngOnInit() {}
}
