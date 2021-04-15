import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;
  user: string = null;
  company: string = null;

  constructor(private api: ApiService, private storage: Storage) {
  }

  public login(user: string, password: string, company: string) {
    return new Promise(resolve => {
      const data = {user, password};
      this.api.postLogin(`/authenticator/signin?companyId=${company}`, null, data)
        .subscribe(resp => {
          if (resp['token']) {
            this.guardarToken(resp['token'], user, company);
            resolve(true);
          } else {
            this.token = null;
            this.user = null;
            this.company = null;
            this.storage.clear();
            resolve(false);
          }
        }, error => {
          this.token = null;
          this.user = null;
          this.company = null;
          this.storage.clear();
          resolve(false);
        });
    })
  }

  async guardarToken(token: string, usuario: string, company: string) {
    this.token = token;
    this.user = usuario;
    this.company = company;
    await this.storage.set('token', token);
    await this.storage.set('usuario', usuario);
    await this.storage.set('company', company);
  }

}
