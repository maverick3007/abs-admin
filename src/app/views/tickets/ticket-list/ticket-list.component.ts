import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../services';



@Component({
    selector: 'ticket-list',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-list.scss')],
    template: require('./ticket-list.html')
})

export class TicketListComponent {


    constructor(private _auth: AuthenticationService, private _state: GlobalState, private _router: Router) {
        this._state.subscribe('tickettable.selected', (value) => {
            var test = value;
            this._router.navigate(['/views/tickets/ticketdetails' ,value.Id]);
        })

    }



}


