import {Component} from '@angular/core';
import {UsuarioService} from "./services/usuario.service";
import {NavController} from "@ionic/angular";
import {UiserviceService} from "./services/uiservice.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private user: UsuarioService, public navCtrl: NavController, public alertMsg: UiserviceService) {
  }

  cerrarSesion() {
    this.alertMsg.showMessageOkCancel('', '¿Estás seguro de cerrar sesión?', 'Cerrar Sesión', 'Cancelar').then(r => {
      if (r.data) {
        this.user.logout()
      }
    })

  }

  changePage(url) {
    this.navCtrl.navigateForward(url)
  }
}
