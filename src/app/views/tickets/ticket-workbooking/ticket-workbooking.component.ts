import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { GlobalState } from '../../../global.state';

@Component({
    selector: 'ticket-workbooking',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-workbooking.scss')],
    template: require('./ticket-workbooking.html')
})

export class TicketWorkbookingComponent {
    ticket: Object = null;
    booking: WaBooking = new WaBooking;
    events: Array<Object> = [];
    unitsToBook:number = 0 ;
    readyForSubmission: boolean = false;

    constructor(private route: ActivatedRoute, private _router: Router, private auth: AuthenticationService, private _state: GlobalState) {
        this.route.params
            .map(params => params['id'])
            .switchMap(id => this.auth.apiGet('taskticket/' + id))
            .subscribe(ticket => {
                this.ticket = ticket;
                this.events = ticket['Events'];
                this.unitsToBook = ticket.TotalWorkUnits;
                this.auth.apiGet('customer/' + ticket['CustomerId'] + '/workagreements').subscribe(wa => {
                    var was = (wa['Results']);
                    for(let wa of was)
                    {
                        var line = new WaBookingLine(wa.Id,wa.Name,wa.WorkUnitCounter.Balance, !wa.SuspendOnZeroWorkUnits);
                        this.booking.Lines.push(line);
                    }
                })
            });
    }

    ngAfterContentChecked() {
        this._state.notifyDataChanged('menu.activeLink', { title: 'Boeken Werkunits' });
    }


}

class WaBooking{
    constructor(){
        this.Lines = [];
    }
    Lines:Array<WaBookingLine>;
    totalBooked(){
        var total = 0;
        for(let line of this.Lines){
            total = total + line.NrBooked;
        }
    }
}

class WaBookingLine{
    constructor(waId:string, waName:string, waBalance:number, canExceed:boolean){
        this.WaId = waId;
        this.WaName = waName;
        this.WaBalance = waBalance;
        this.CanExceed = canExceed;
        this.NrBooked = 0;
    }
    WaId:string;
    WaName:string;
    WaBalance:number;
    NrBooked:number;
    CanExceed:boolean;
    isValid():boolean{
        if(this.CanExceed)
        {
            if(this.WaBalance - this.NrBooked < 0)
            {
                return false;
            }
        }
        return true;
    }
}