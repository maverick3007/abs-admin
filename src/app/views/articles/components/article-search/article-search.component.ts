import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { AuthenticationService } from '../../../../services';
import { FormControl } from '@angular/forms';
import { GlobalState } from '../../../../global.state';


@Component({
    selector: 'article-search',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./article-search.scss')],
    template: require('./article-search.html')
})

export class ArticleSearchComponent implements OnChanges {
    searchString: string = "";
    lookup = new FormControl('');
    searchFor: string = "Name";
    constructor(private _auth: AuthenticationService, private _state:GlobalState) {

    }

    ngOnChanges() {
    }

    searchArt(){
        if(!!this.lookup.value){
            this._state.notify('articlesearch.exec', {method: this.searchFor, value: this.lookup.value});
        }
        
    }

}