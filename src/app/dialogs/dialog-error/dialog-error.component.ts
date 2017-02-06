import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {GlobalState} from '../../global.state';


@Component({
  selector: 'dialog-error',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dialog-error.scss')],
  template: require('./dialog-error.html'),
})

export class DialogError  {
  @ViewChild('errModal') errModal: ModalDirective;
  title: String = 'titel';
  message: String = 'bericht';
  constructor( private _state:GlobalState) {

      this._state.subscribe('popup.error', (error) =>{
        this.title = error.title;
        this.message = error.message;
        this.showDialog();
      })
  }


  public showDialog(): void {
    this.errModal.show();
  }
}