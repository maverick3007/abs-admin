import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {GlobalState} from '../../global.state';


@Component({
  selector: 'dialog-message',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dialog-message.scss')],
  template: require('./dialog-message.html'),
})

export class DialogMessage  {
  @ViewChild('msgModal') errModal: ModalDirective;
  title: String = 'titel';
  message: String = 'bericht';
  constructor( private _state:GlobalState) {

      this._state.subscribe('popup.message', (msg) =>{
        this.title = msg.title;
        this.message = msg.message;
        this.showDialog();
      })
  }


  public showDialog(): void {
    this.errModal.show();
  }
}