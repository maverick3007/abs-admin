import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../services';
import { InitService } from '../../../services';
import '../../../components/rich-editor/rich-editor.loader.ts';

@Component({
    selector: 'new-wa',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./new-wa.scss')],
    template: require('./new-wa.html')
})

export class NewWaComponent{
    wa: WorkAgreement = new WorkAgreement;
    waTypes: Array<Object>;
    constructor(private route: ActivatedRoute, private _router: Router, private _location: Location, private auth: AuthenticationService, private _state: GlobalState, private _init: InitService){
        this.route.params    
            .map(params => params['id'])
            .switchMap(id => this.auth.apiGet('customer/' + id))
            .subscribe(cust => {
                if(cust.Id == null){
                    this._state.notify('popup.customerselect', '');
                }else{
                    this.wa.Customer = cust;
                }
            });
            this.waTypes = this._init.waTypes;
            this._state.subscribe('customer.details', (value) => {
            this.wa.Customer = value;
        });
    }

    selectOtherCustomer(){
        this._state.notify('popup.customerselect', '');
    }
}

class WorkAgreement{
    Customer:Object;
    WorkAgreementTypeId:string;
}