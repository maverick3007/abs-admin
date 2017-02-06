import { Injectable } from '@angular/core';


@Injectable()
export class ConstantsService {

  root_url: string = 'http://api-abs.azurewebsites.net/'; 
  //root_url: string = 'http://localhost:53628/';

  DocumentTypes: Array<Object> = [];

  constructor() { 
      //this._auth.apiGet()
  }

}
