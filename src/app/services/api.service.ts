import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from "rxjs";
import {environment as ENV} from '../../environments/environment';
import {UsuarioService} from "./usuario.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  environmentName: any;
  environmentUrl = 'Debug api';
  user;


  constructor(private http: HttpClient, private authService: AuthService) {
    this.environmentName = ENV.environmentName;
    this.environmentUrl = ENV.apiUrl;
  }

  public get(url: string, body?: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`
    });

    const header = {
      'Authorization': 'Bearer ' + this.authService.token
    };

    return this.http.get(this.environmentUrl + url, {params: body, headers: header});
  }

  public post(url: string, body?: any, query?: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`
    });
    return this.http.post<any>(this.environmentUrl + url, body, {
      params: query,
      headers
    });
  }

  public postList(url: string, body?: any): Observable<any> {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const token = currentUser ? `Bearer ${currentUser.token}` : null;
    const array = [];

    const headers = new HttpHeaders({
      Authorization: token
    });
    array.push(this.http.post<any>(this.environmentUrl + url, body, {
      headers
    }));
    return forkJoin(array);
  }

  public getList(url: string, body?: any): Observable<any> {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const token = currentUser ? `Bearer ${currentUser.token}` : null;
    const array = [];

    const headers = new HttpHeaders({
      Authorization: token
    });

    array.push(this.http.get<any>(this.environmentUrl + url, {
      params: body,
      headers
    }));

    return forkJoin(array);
  }

  public postLogin(url: string, body?: any, header?: any) {
    const headers = new HttpHeaders({
      authorization: `Basic ${window.btoa(header.user + ':' + header.password)}`
    });
    return this.http.post<any>(this.environmentUrl + url, null, {
      headers
    });

  }


}
