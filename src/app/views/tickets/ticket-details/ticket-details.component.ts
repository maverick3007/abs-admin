import { Component, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { GlobalState } from '../../../global.state';
import { Location } from '@angular/common';
import '../../../components/rich-editor/rich-editor.loader.ts';
import { InitService } from '../../../services';

@Component({
    selector: 'ticket-details',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-details.scss')],
    template: require('./ticket-details.html')
})

export class TicketDetailsComponent implements AfterViewChecked {
    ticket: Object = null;
    newWork: Event = new Event;
    events: Array<Object> = [];
    editing: boolean = false;
    editingDescription: boolean = false;
    addingComment: boolean = false;
    addingWork: boolean = false;
    EditDescription: string = "";
    newComment: string = "";
    editAssignedToId: string = "";
    editPriorityId: string = "";
    editStatusId: string = "";
    priorities: Array<Object>;
    statuses: Array<Object>;
    users: Array<Object>;
    constructor(private route: ActivatedRoute, private _router: Router, private auth: AuthenticationService, private _state: GlobalState, private _init: InitService) {
        this.route.params
            .map(params => params['id'])
            .switchMap(id => this.auth.apiGet('taskticket/' + id))
            .subscribe(ticket => {
                this.ticket = ticket;
                this.refreshTaskTicket();
            });
    }

    toggleEditing() {
        this.editing = !this.editing;
        this.refreshTaskTicket();
    }

    toggleEditingDescription() {
        this.editingDescription = !this.editingDescription;
        this.toggleEditing();
    }

    toggleAddingComment() {
        this.addingComment = !this.addingComment;
        this.toggleEditing();
    }

    toggleAddingWork() {
        this.newWork = new Event;
        this.newWork.Title = "";
        this.newWork.WorkUnits = 1;
        this.addingWork = !this.addingWork;
        this.toggleEditing();
    }

    refreshTaskTicket() {
        let ticket = this.ticket;
        this.events = ticket['Events'];
        this.EditDescription = ticket['Description'];
        this.editAssignedToId = ticket['AssignedToId'];
        this.editPriorityId = ticket['PriorityId'];
        this.editStatusId = ticket['StatusId'];
        this._state.notifyDataChanged('menu.activeLink', { title: 'Ticket ' + ticket['Id'] });
    }

    saveChanges() {
        this.ticket['Description'] = this.EditDescription
        this.ticket['AssignedToId'] = this.EditDescription
        this.ticket['PriorityId'] = this.EditDescription
        this.ticket['StatusId'] = this.EditDescription
    }

    setStatus() {
        if (this.ticket['StatusId'] != this.editStatusId) {
            this.auth.apiGet('taskticket/' + this.ticket['Id'] + "/status/" + this.editStatusId).subscribe(ticket => {
                this.ticket = ticket;
                this.refreshTaskTicket();
            })
        }
    }

    setPriority() {
        if (this.ticket['PriorityId'] != this.editPriorityId) {
            this.auth.apiGet('taskticket/' + this.ticket['Id'] + "/priority/" + this.editPriorityId).subscribe(ticket => {
                this.ticket = ticket;
                this.refreshTaskTicket();
            })
        }
    }

    setAssignedTo() {
        if (this.ticket['AssignedToId'] != this.editAssignedToId) {
            this.auth.apiGet('taskticket/' + this.ticket['Id'] + "/assign/" + this.editAssignedToId).subscribe(ticket => {
                this.ticket = ticket;
                this.refreshTaskTicket();
            })
        }
    }

    setDescription() {

        if (this.ticket['Description'] != this.EditDescription) {
            var Description = new DataString;
            Description.data = this.EditDescription
            this.auth.apiPost('taskticket/' + this.ticket['Id'] + "/description/", Description).subscribe(ticket => {
                this.ticket = ticket;
                this.refreshTaskTicket();
                this.toggleEditingDescription()
            })
        }
    }

    addComment() {
        var Comment = new DataString;
        Comment.data = this.newComment;
        this.auth.apiPost('taskticket/' + this.ticket['Id'] + "/comment/", Comment).subscribe(ticket => {
            this.ticket = ticket;
            this.refreshTaskTicket();
            this.toggleAddingComment()
        })
    }

    addWork() {
        if (this.newWork.WorkUnits > 0) {
            this.auth.apiPost('taskticket/' + this.ticket['Id'] + "/workunits/", this.newWork).subscribe(ticket => {
                this.ticket = ticket;
                this.refreshTaskTicket();
                this.toggleAddingWork();
            })
        }
    }


    ngAfterViewChecked() {
        this.priorities = this._init.taskTicketpriorities;
        this.statuses = this._init.taskTicketStatuses;
        this.users = this._init.taskTicketusers;
    }

    navBack() {
        this._router.navigate(['/views/tickets/ticketlist']);
    }



}

class DataString {
    data: string;
}

class Event {
    Description: string;
    Title: string;
    WorkUnits: number;
}