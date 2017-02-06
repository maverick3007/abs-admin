import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import {GlobalState} from '../../global.state';

@Component({
  selector: 'articles',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./articles.scss')],
  template: require('./articles.html')
})
export class ArticlesComponent implements OnInit {
  article;
  constructor( private _router:Router, private _state:GlobalState) {
      this._state.subscribe('article.details', (value) => {
        this.article = value;
        let id = value['Id']
        this._router.navigate(['/views/documents/articledetails', id ]);
    });
  }

  ngOnInit(){
    
  }

  search(){
    this._state.notify('popup.articlecatselect', '');
  }

  /*searchOut(){
    this._state.notify('popup.documentoptselect', 'out');
  }*/


}