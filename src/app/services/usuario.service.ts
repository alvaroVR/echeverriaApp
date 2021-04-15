import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null

  constructor(private api: ApiService, private storage: Storage) {
  }

  public login(user: string, password: string, company: string) {
    const data = {user, password};
    this.api.postLogin(`/authenticator/signin?companyId=${company}`, null, data)
      .subscribe(resp => {
        if (resp['code']) {
          this.guardarToken(resp['token']);
        } else {
          this.token = null;
          //this.storage.clear();
        }
      });
  }

  async guardarToken(token: string) {
    this.token = token;
    // await this.storage.set('token', token);
  }

}
