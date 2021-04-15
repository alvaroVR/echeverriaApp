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
    await this.storage.set('usuario', usuario);
    await this.storage.set('company', company);
    this.navCtrl.navigateRoot(['gestion-task-owner'])
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
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
