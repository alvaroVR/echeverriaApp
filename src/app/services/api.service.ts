import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {environment as ENV} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  environmentName: any;
  environmentUrl = 'Debug api';

  user;

  token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYmVybmFiZSIsInJvbGUiOiJkZWZhdWx0IiwiaWF0IjoxNjE4MjUyMjk5LCJleHAiOjE2MTgzOTYyOTl9.4IUbh_ksKqlqQ9ASTBrn6v3_eMBRqBjHdOWbMsv1kKQ';


  constructor(public http: HttpClient) {
    this.environmentName = ENV.environmentName;
    this.environmentUrl = ENV.apiUrl;

  }

  public get(url: string, body?: any) {
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // const token = currentUser ? `Bearer ${currentUser.token}` : null;

    const headers = new HttpHeaders({
      Authorization: 'token'
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer'+ this.token
      })
    };

    return this.http.get(this.environmentUrl + url, httpOptions);
  }

  public post(url: string, body?: any, query?: any) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const token = currentUser ? `Bearer ${currentUser.token}` : null;

    const headers = new HttpHeaders({
      Authorization: token
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
