import {Component} from '@angular/core';
import {UsuarioService} from "./services/usuario.service";
import {MenuController, NavController} from "@ionic/angular";
import {UiserviceService} from "./services/uiservice.service";
import {MenuService} from "./services/menu.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  optionsMenu: any = null;

  constructor(private user: UsuarioService, public navCtrl: NavController, public alertMsg: UiserviceService, private menuService: MenuService) {
    this.optionsMenu = this.menuService.details

  }

  cerrarSesion() {
    this.alertMsg.showMessageOkCancel('', '¿Estás seguro de cerrar sesión?', 'Cerrar Sesión', 'Cancelar').then(r => {
      if (r.data) {
        this.user.logout()
      }
    })
  }

  openFirst() {

  }

  changePage(url) {
    this.navCtrl.navigateForward(url)
  }
}
