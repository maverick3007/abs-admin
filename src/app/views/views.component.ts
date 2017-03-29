import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'views',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
      <dialog-error></dialog-error>
      <dialog-message></dialog-message>
    <dialog-customer-select></dialog-customer-select>
    <dialog-document-select></dialog-document-select>
    <dialog-document-opt-select></dialog-document-opt-select>
    <dialog-articlecat-select></dialog-articlecat-select>
    <ba-sidebar></ba-sidebar>
    <ba-page-top ></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://www.ankabs.be">Anka Business Systems</a> 2016 <strong>VERSION 0.1.10</strong></div>
        <ul class="al-share clearfix">
          <!--<li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>-->
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>

    `
})
export class Views {

  username = "Nikske";
  constructor() {
  }

  ngOnInit() {
    
  }
}
