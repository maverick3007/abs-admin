import {Component, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services';
import { AuthenticationService } from '../../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'customer-details',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./customer-details.scss')],
  template: require('./customer-details.html')
})

export class CustomerDetailsComponent  {
    customer;
    constructor(private route: ActivatedRoute, private messageService: MessageService, private auth: AuthenticationService){
                this.route.params
        .map(params => params['id'])
        .switchMap(id => this.auth.apiGet('customer/' + id ))
        .subscribe(customer => this.customer = customer);
    }






}