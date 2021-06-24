import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";
import {MenuController} from "@ionic/angular";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public details: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(public menu: MenuController, public api: ApiService) {
  }

  //getappspathaccesmenu?userId=maraya&companyId=90844000-5}
  getappspathaccesmenu(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getappspathaccesmenu`, query).subscribe((response: any) => {
      subject.next(response);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  public toggle() {
    this.menu.toggle('slidingMenu');
    console.log('asssd')
  }

}
