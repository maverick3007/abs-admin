import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../services';
import { GlobalState } from '../../../../global.state';

@Component({
    selector: 'ticket-workbooking',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-workbooking.scss')],
    template: require('./ticket-workbooking.html')
})

export class TicketWorkbookingComponent implements OnChanges {
    booking: WaBooking = new WaBooking;
    bookings:Array<Object> = [];
    unitsToBook: number = 0;
    readyForSubmission: boolean = false;
    Date: any;
    @Input() ticket: Object;
    constructor(private route: ActivatedRoute, private _router: Router, private auth: AuthenticationService, private _state: GlobalState) {

    }

    ngOnChanges() {
        this.refresh();
    }

    refresh(){
        this.booking = new WaBooking;
        if (!!this.ticket) {
            this.bookings = [];
            this.auth.apiGet('taskticket/' + this.ticket['Id'] + '/worklogs').subscribe(logList => {
                var logs = (logList['Results']);
                for (let log of logs){
                    this.bookings.push(log); 
                }
            })
            this.Date = new Date();
            this.auth.apiGet('customer/' + this.ticket['CustomerId'] + '/workagreements').subscribe(wa => {
                var was = (wa['Results']);
                for (let wa of was) {
                    var line = new WaBookingLine(wa.Id, wa.Name, wa.WorkUnitCounter.Balance, !wa.SuspendOnZeroWorkUnits);
                    this.booking.Lines.push(line);
                }
            })
        }
    }

    ngAfterContentChecked() {
        this._state.notifyDataChanged('menu.activeLink', { title: 'Boeken Werkunits' });
    }

    persist() {
        let logs: Array<Object> = [];
        for (let line of this.booking.Lines) {
            let log: Log = new Log;
            log.NrOfUnits = line.NrBooked;
            log.TaskTicketId = this.ticket['Id'];
            log.WorkAgreementId = line.WaId;
            log.WorkDate = this.BookDate;
            log.Description = this.booking.Description;
            logs.push(log);
        }
        this.auth.apiPost('taskticket/' + this.ticket['Id'] + "/logwork", logs).subscribe(() =>{
            this.refresh();
        });
    }

    set BookDate(e) {
        e = e.split('-');
        let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
        this.Date.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }

    get BookDate() {
        return this.Date.toISOString().substring(0, 10);
    }

}


class WaBooking {
    constructor() {
        this.Lines = [];
        this.Description = "";
    }
    Lines: Array<WaBookingLine>;
    Date: string;
    Description: string;
    totalBooked(): number {
        var total = 0;
        for (let line of this.Lines) {
            total = total + line.NrBooked;
        }
        return total;
    }
    canPersist(): boolean {
        if (this.Lines.length == 0||this.totalBooked() ==0) { return false; }

        for (let line of this.Lines) {
            if (line.isInError()) {
                return false;
            }
        }
        return true;
    }
}



class WaBookingLine {
    constructor(waId: string, waName: string, waBalance: number, canExceed: boolean) {
        this.WaId = waId;
        this.WaName = waName;
        this.WaBalance = waBalance;
        this.CanExceed = canExceed;
        this.NrBooked = 0;
    }
    WaId: string;
    WaName: string;
    WaBalance: number;
    NrBooked: number;
    CanExceed: boolean;
    isInError(): boolean {
        if (!this.CanExceed) {
            if ((this.WaBalance - this.NrBooked < 0) || (this.NrBooked < 0)) {
                return true;
            }
        }
        return false;
    }
}

class Log {
    WorkAgreementId: string;
    NrOfUnits: number;
    TaskTicketId: string;
    WorkDate:any;
    Description: string;
}