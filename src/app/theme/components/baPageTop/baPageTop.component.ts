import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {AuthenticationService} from '../../../services'
import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop implements OnInit{

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public userName = "ToBeDone";

  constructor(private _state:GlobalState,  private _authenticationService: AuthenticationService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
     
    });
  }

  ngOnInit(){
    this._authenticationService.getUser().subscribe(value => {
      this.userName = value['Email'];
    })

  }
  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
  

  public signOut(){
    this._authenticationService.logout();
  }
}
