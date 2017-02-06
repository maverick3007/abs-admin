import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MessageService {

// Observable string sources
    private errorAnnouncedSource = new Subject<string>();
    private custSelectPopupSource = new Subject<string>();
    private docSelectPopupSource = new Subject<string>();
    private docOptSelectPopupSource = new Subject<string>();

    // Observable object sources
private customerAnnouncedSource = new Subject<Object>();
private documentAnnouncedSource = new Subject<Object>();

// Observable string streams
  errorAnnounced$ = this.errorAnnouncedSource.asObservable();
  custSelectPopupAnnounced$ = this.custSelectPopupSource.asObservable();
  docSelectPopupAnnounced$ = this.docSelectPopupSource.asObservable();
  docOptSelectPopupAnnounced$ = this.docOptSelectPopupSource.asObservable();
  
  customerAnnounced$ = this.customerAnnouncedSource.asObservable();
  documentAnnounced$ = this.documentAnnouncedSource.asObservable();

      // Service message commands
  announceError(error: string) {
    this.errorAnnouncedSource.next(error);
  }

  announceCustSelectPopup(text: string) {
    this.custSelectPopupSource.next(text);
  }

  announceDocSelectPopup(text: string) {
    this.docSelectPopupSource.next(text);
  }

  announceDocOptSelectPopup(text:string){
    this.docOptSelectPopupSource.next(text);
  }

  announceCustomer(customer: Object){
    this.customerAnnouncedSource.next(customer);
  }

  announceDocument(doc: Object){
    this.documentAnnouncedSource.next(doc);
  }

}