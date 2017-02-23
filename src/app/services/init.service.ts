import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { ConstantsService } from './constants.service';

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
  constructor(private _http: Http, private _const: ConstantsService) {

  }

  initialize():Promise<any> {
    return new Promise((resolve, reject)=>{
    this.getActiveYears();
    var observ = this._http.get(this._const.root_url + 'api/init').map(res => {
      let resp:Response = res
      return resp.json()
    });  
    observ.subscribe(value => {

      this.documentTypesIn = value['InDocTypes'];
      this.documentTypesOut = value['OutDocTypes'];
      this.categoryTree = value['CategoryTree'];
      this.taskTicketpriorities = value['TaskTicketPriorities'];
      this.taskTicketStatuses = value['TaskTicketStatuses'];
      this.taskTicketusers = value['TaskTicketUsers'];
      resolve('Init values loaded successfully.');
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
