import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class InitService {

  init: Object;
  documentTypesIn: Array<Object> = [];
  documentTypesOut: Array<Object> = [];
  categoryTree: Array<Object> = [];
  taskTicketStatuses: Array<Object> = [];;
  taskTicketpriorities: Array<Object> = [];;
  taskTicketusers: Array<Object> = [];;
  activeYears: Array<Number> = [];
  constructor(private _auth: AuthenticationService) {

  }

  initialize():Promise<any> {
    return new Promise((resolve, reject)=>{
    this.getActiveYears();
    this._auth.apiGet('init').subscribe(value => {
      this.init = value;
      this.documentTypesIn = this.init['InDocTypes'];
      this.documentTypesOut = this.init['OutDocTypes'];
      this.categoryTree = this.init['CategoryTree'];
      this.taskTicketpriorities = this.init['TaskTicketPriorities'];
      this.taskTicketStatuses = this.init['TaskTicketStatuses'];
      this.taskTicketusers = this.init['TaskTicketUsers'];
    });
    })
  }



  getActiveYears() {
    var d = new Date();
    var n = d.getFullYear();
    for (var i = 0; i < 10; i++) {
      this.activeYears.push(n - i);
    }
  }



}
