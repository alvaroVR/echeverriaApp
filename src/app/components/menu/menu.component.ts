import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {MenuController, NavController} from "@ionic/angular";
import {UiserviceService} from "../../services/uiservice.service";
import {MenuService} from "../../services/menu.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menues: any;

  constructor(private user: UsuarioService, public alertMsg: UiserviceService,
              public navCtrl: NavController, private menu: MenuService, public authService: AuthService) {
  }

  ngOnInit() {
    this.getappspathaccesmenu()
  }

  getappspathaccesmenu() {
    const request = {
      userId: this.authService.user,
      companyId: this.authService.company,
    }
    this.menu.getappspathaccesmenu(request).subscribe(r => {
      this.menues = r.detalles
      this.menu.details.next(this.menues);
    })
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
