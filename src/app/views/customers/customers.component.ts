import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import {GlobalState} from '../../global.state';

@Component({
  selector: 'customers',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./customers.scss')],
  template: require('./customers.html')
})
export class CustomersComponent implements OnInit {
  customer;
  constructor(private _router:Router, private _state:GlobalState) {
      this._state.subscribe('customer.details', (value) => {
        this.customer = value;
        let id = value['Id']
        this._router.navigate(['/views/customers/customerdetails', id ]);
      });
  }

  ngOnInit(){
    
  }

  ngOnDestroy(){
    this._state.unsublast('customer.details');
  }


  search(){
    this._state.notify('popup.customerselect', '');
  }


}