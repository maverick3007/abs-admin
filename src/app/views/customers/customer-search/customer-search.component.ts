import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

//import {CustomerIdentityComponent} from '../customers/customer-identity/customer-identity'

@Component({
  selector: 'customer-search',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./customer-search.scss')],
  template: require('./customer-search.html')
})
export class CustomerSearchComponent implements OnInit {
  test= 'yoho';
  customer;
  subscription: Subscription;
  constructor(private messageService: MessageService, private _router:Router) {
    this.subscription = this.messageService.customerAnnounced$.subscribe(
      value => {
        this.customer = value;
      });
  }

  ngOnInit(){
    this.messageService.announceCustSelectPopup("go")
  }


}