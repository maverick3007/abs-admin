import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';

import { ConstantsService } from './constants.service';
import { MessageService } from './message.service';
import {GlobalState} from '../global.state';

import {DialogError } from '../dialogs/dialog-error/dialog-error.component';

@Injectable()
export class AuthenticationService {
    private loggedIn = false;
    public userName;
    public authToken;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private _http: Http, private _const: ConstantsService, private _router: Router, private _messageService:MessageService, private _state:GlobalState) {
        this.loggedIn = !!localStorage.getItem('auth_token');
        if(this.loggedIn)
        {
            this.getUser();
        }
    }

    login(username: String, password: String) {
        let creds = "grant_type=password&username=" + username + "&password=" + password;
        let self = this;
        this.getAuth(creds, self).subscribe(res => {
            this.loggedIn = res;
            this._router.navigate([this.redirectUrl]);
        });
    }

    getAuth(creds: String, self) {
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._const.root_url + 'Token', creds, {
            headers: headers
        }).map(res => this.extractJwt(res, self)).catch(err=>this.handleError(err, self))
    }

    apiGet(apistring: string) {
        let authToken = localStorage.getItem('auth_token');
        let self = this;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${authToken}`);

        return this._http.get(this._const.root_url + 'api/' + apistring, { headers: headers })
            .map(this.extractData)
            .catch(err => {
                if (err.status == 401) {
                    this.logout();
                    return Observable.arguments;
                } else {
                    this.handleError(err, self);
                }
            });
    }

    apiPost(apistring: string, postOb: Object) {
        let authToken = localStorage.getItem('auth_token');
        let self = this;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${authToken}`);

        return this._http.post(this._const.root_url + 'api/' + apistring, postOb, { headers: headers })
            .map(this.extractData)
            .catch(err => {
                if (err.status == 401) {
                    this.logout();
                    return Observable.arguments;
                } else {
                    this.handleError(err, self);
                }
            });
    }

    getUser() {
        let authToken = localStorage.getItem('auth_token');
        let self = this;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${authToken}`);

        return this._http.get(this._const.root_url + 'api/Account/UserInfo', { headers: headers })
            .map(this.extractData)
            .catch(err => {
                if (err.status == 401) {
                    this.logout();
                    return Observable.arguments;
                } else {
                    this.handleError(err, self);
                }
            });
    }

    private handleError(error: any, self) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        //self._messageService.announceError(errMsg);
        self._state.notifyDataChanged('popup.error', {title:'Fout', message:errMsg})
        return Observable.throw(errMsg);
    }

    private extractJwt(res: Response,self): boolean {
        let body = res.json();
        self.authToken=body.access_token;
        self.userName = body.userName;
        localStorage.setItem('auth_token', body.access_token);
        return true;
    }

    private extractData(res: Response) {
        let body = res.json();    
        return body;
    }


    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._router.navigate([''])
    }

    isLoggedIn() {
        return this.loggedIn;//!!localStorage.getItem('auth_token');
    }

}
