import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../services';
import { InitService } from '../../../services';
import { ValidationService } from '../../../services';
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
    waForm:FormGroup;
    constructor(@Inject(FormBuilder) fb: FormBuilder, private route: ActivatedRoute, private _router: Router, private _location: Location, private auth: AuthenticationService, private _state: GlobalState, private _init: InitService){
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
            this.wa.SuspendOnZeroWorkUnits = false;
            this.wa.PricePerWorkUnit = 0;
            
            this.waForm = fb.group({
                 Name:['', [Validators.required]],
                 WorkAgreementTypeId:['',Validators.required],
                 Scope:['Scope description'],
                 StartDate:['', ValidationService.stringIsDateValidator],
                 EndDate:['', ValidationService.stringIsDateValidator],
                 SalesPrice:[0, ValidationService.stringIsNumeric],
                 NrOfWorkUnitsOnStart: [0, ValidationService.stringIsInteger],
                 NrOfMonthlWorkyUnits: [0, ValidationService.stringIsInteger],
                 PricePerWorkUnit: [0, ValidationService.stringIsNumeric]
            });
        });
    }

    ngOnDestroy(){
        this._state.unsublast('customer.details');
    }

    selectOtherCustomer(){
        this._state.notify('popup.customerselect', '');
    }


    toggleSuspendOnZero(){
         this.wa.SuspendOnZeroWorkUnits = !this.wa.SuspendOnZeroWorkUnits;
         if( this.wa.SuspendOnZeroWorkUnits){
              this.waForm.controls['PricePerWorkUnit'].setValue(0);
              this.waForm.controls['PricePerWorkUnit'].disable();
         }else{
              this.waForm.controls['PricePerWorkUnit'].enable();
         }
    }

    createAgreement(){
        this.wa.WorkAgreementTypeId = this.waForm.controls['WorkAgreementTypeId'].value;
        this.wa.PricePerWorkUnit = this.waForm.controls['PricePerWorkUnit'].value;
        this.wa.Name = this.waForm.controls['Name'].value;
        this.wa.Scope = this.waForm.controls['Scope'].value;
        this.wa.StartDate = this.waForm.controls['StartDate'].value;
        this.wa.EndDate = this.waForm.controls['EndDate'].value;
        this.wa.SalesPrice = this.waForm.controls['SalesPrice'].value;
        this.wa.NrOfWorkUnitsOnStart = this.waForm.controls['NrOfWorkUnitsOnStart'].value;
        this.wa.NrOfMonthlWorkyUnits = this.waForm.controls['NrOfMonthlWorkyUnits'].value;
        this.auth.apiPost('workagreement', this.wa).subscribe(newWa =>{
            this.afterCreation(newWa['Id']);
        });
    }

    afterCreation(id){
        this._state.notify('popup.message', {title:'nieuwe overeenkomst', message:id});
        this._router.navigate(['/views/workagreements/walist' ])
    }
}

class WorkAgreement{
    Customer:Object;
    WorkAgreementTypeId:string;
    SuspendOnZeroWorkUnits: boolean;
    PricePerWorkUnit: number;
    Scope: string;
    Name: string;
    StartDate: Date;
    EndDate:Date;
    SalesPrice:Number;
    NrOfWorkUnitsOnStart: number;
    NrOfMonthlWorkyUnits: number;
}