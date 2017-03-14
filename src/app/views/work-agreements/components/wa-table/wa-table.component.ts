import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../services';
import {GlobalState} from '../../../../global.state';

@Component({
    selector: 'wa-table',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./wa-table.scss')],
    template: require('./wa-table.html')
})

export class WaTableComponent implements OnInit{
    was: Array<Object>=[];
    filterString: string;
    page: number;
    hasMoreEntries: boolean;
    loading: boolean;

    constructor(private _auth: AuthenticationService, private _state:GlobalState ) {

        this._state.subscribe('wafilter.filtersent', (value) =>{
            this.filterString = value;
            this.page = 0;
            this.was = [];
        });
    }

    ngOnInit(){
        this.page = 0;
        this.filterString = '';
        this.was = [];
        this.hasMoreEntries = false;
        this.loading = false;
        this.getWas();
    }
    
    ngOnDestroy(){
        this._state.unsublast('wafilter.filtersent');
    }

    getWas(){
        this.page++;
        this.loading = true;
        this._auth.apiGet('workagreement?pger=' + this.page + this.filterString).subscribe(was => this.extractWas(was))
    }

    extractWas(was){
        this.loading = false;
        this.page = was.Page;
        (was.Page == was.Pages) ? this.hasMoreEntries = false : this.hasMoreEntries = true;
        for (var i = 0; i < was.Results.length; i++) {
            this.was.push(was.Results[i]);
        }
    }

    selectWa(val){
        this._state.notify('watable.selected', val)
    }
}