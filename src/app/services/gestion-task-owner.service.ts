import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GestionTaskOwnerService {

  constructor(private api: ApiService) {
  }

//https://6k2nqb8tah.execute-api.us-east-1.amazonaws.com/eimrktplace/marketplace/getdettaskresponsable?userId=admin&companyIdUsr=90844000-5
  getdettaskresponsable(query) {
    const subject = new Subject<any>();
    this.api.get(`/loadmanager/getdettaskresponsable`, query).subscribe((data: any) => {
      subject.next(data);
    }, error => {
      subject.error(error);
    });
    return subject;
  }
}
