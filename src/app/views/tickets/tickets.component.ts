import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import {GlobalState} from '../../global.state';

@Component({
  selector: 'tickets',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./tickets.scss')],
  template: require('./tickets.html')
})
export class TicketsComponent implements OnInit {
  article;
  constructor( private _router:Router, private _state:GlobalState) {
      /*this._state.subscribe('article.details', (value) => {
        this.article = value;
        let id = value['Id']
        this._router.navigate(['/views/documents/articledetails', id ]);
    });*/
  }

  ngOnInit(){
    
  }

}