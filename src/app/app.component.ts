import {Component} from '@angular/core';
import {UsuarioService} from "./services/usuario.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private user: UsuarioService, public navCtrl: NavController) {
  }

  cerrarSesion() {
    this.user.logout()
  }

  changePage(url) {
    this.navCtrl.navigateForward(url)
  }
}
