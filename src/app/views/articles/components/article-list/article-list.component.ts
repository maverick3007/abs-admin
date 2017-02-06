import { Component, ViewEncapsulation, OnChanges } from '@angular/core';
import { AuthenticationService } from '../../../../services';
import { GlobalState } from '../../../../global.state';

@Component({
    selector: 'article-list',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./article-list.scss')],
    template: require('./article-list.html')
})

export class ArticleListComponent implements OnChanges {
    articles: Array<Object> = [];
    hasMoreEntries = false;
    searchType;
    lookup;
    pageNr;
    loading;
    searchString;
    constructor(private _auth: AuthenticationService, private _state: GlobalState) {
        this._state.subscribe('articlesearch.exec', (value) => {
            this.searchType = value.method;
            this.lookup = value.value;
            this.articles = [];
            this.searchArticles();
        });
    }
    searchArticles() {
        this.loading=true;
        
        if (this.searchType == 'Name') { (this.searchString = 'keywrds=' + this.lookup) };
        if (this.searchType == 'Id') { (this.searchString = 'artid=' + this.lookup) };
        this._auth.apiGet('article?' + this.searchString).subscribe(arts => this.extractArts(arts));
    }

    extractArts(arts){
        this.loading = false;
        this.pageNr = arts.Page;
        (arts.Page == arts.Pages)?this.hasMoreEntries = false:this.hasMoreEntries = true;
        for (var i = 0; i < arts.Results.length; i++){
            this.articles.push(arts.Results[i]);
        }
    }

    loadMore(){
        this.pageNr++;
        this._auth.apiGet(this.searchString + '&pger=' + this.pageNr)
                    .subscribe(arts => this.extractArts(arts))        
    }

    ngOnChanges() {
    }
}