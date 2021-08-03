import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinalDiaService {

  constructor(private api: ApiService) {
  }

  //getinfofindiacapataz?userId=cbernabe&companyIdUsr=90844000-5
  getinfofindiacapataz(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getinfofindiacapataz`, query).subscribe((response: any) => {
      subject.next(response);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  //getinfoactivityfindiacapataz?userId=cbernabe&companyIdUsr=90844000-5
  getinfoactivityfindiacapataz(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getinfoactivityfindiacapataz`, query).subscribe((response: any) => {
      subject.next(response);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  //putfindiacapatazdothh?userId=cbernabe&companyId=01&clientId=01&projectId=4600018331&regOTId=1&regSubpartidaId=1&regTaskId=3&fechaEjec=22-06-2021&dni=19160728-7&hh=6
  putfindiacapatazdothh(request) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putfindiacapatazdothh`, null, request).subscribe((response: any) => {
      subject.next(response);
    }, error => subject.error(error));
    return subject.asObservable();
  }

  //putfindiacapatazdothh?userId=cbernabe&companyId=01&clientId=01&projectId=4600018331&regOTId=1&regSubpartidaId=1&regTaskId=3&fechaEjec=22-06-2021&dni=19160728-7&hh=6&hhExtras=2


}
