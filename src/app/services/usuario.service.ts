import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Storage} from "@ionic/storage";
import {HttpHeaders} from "@angular/common/http";
import {NavController} from "@ionic/angular";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;
  user: string = null;
  company: string = null;

  constructor(private api: ApiService, private storage: Storage, private authService: AuthService) {
  }

  public login(user: string, password: string, company: string) {
    return new Promise(resolve => {
      const data = {user, password};
      this.api.postLogin(`/authenticator/signin?companyId=${company}`, null, data)
        .subscribe(resp => {
          if (resp['token']) {
            this.authService.guardarToken(resp['token'], user, company);
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


}
