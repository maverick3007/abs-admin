import {Component, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
  selector: 'work-agreements',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./work-agreements.scss')],
  template: require('./work-agreements.html')
})
export class WorkAgreementsComponent  {
  article;
  constructor( ) {

  }



}