import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../services';

@Component({
    selector: 'wa-list',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./wa-list.scss')],
    template: require('./wa-list.html')
})

export class WaListComponent {
    constructor(private _auth: AuthenticationService, private _state: GlobalState, private _router: Router) {
        this._state.subscribe('watable.selected', (value) => {
            var test = value;
            this._router.navigate(['/views/workagreements/workagreementdetails', value.Id]);
        })
    }

    ngOnDestroy(){
        this._state.unsublast('watable.selected');
    }
}