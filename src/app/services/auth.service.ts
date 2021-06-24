import {Injectable} from '@angular/core';
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = null;
  user: string = null;
  company: string = null;

  constructor(private navCtrl: NavController, private storage: Storage) {
  }

  async guardarToken(token: string, usuario: string, company: string) {
    this.token = token;
    this.user = usuario;
    this.company = company;

    await this.storage.set('token', token);
    await this.storage.set('user', usuario);
    await this.storage.set('company', company);
    this.navCtrl.navigateRoot(['listActivity'])
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
    this.user = await this.storage.get('user') || null;
    this.company = await this.storage.get('company') || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();
    if (this.token) {
      return Promise.resolve(true)
    } else {
      this.navCtrl.navigateRoot(['/login']);
      return Promise.resolve(false)
    }
  }

}
