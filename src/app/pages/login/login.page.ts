import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {NavController} from "@ionic/angular";
import {UiserviceService} from "../../services/uiservice.service";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    usuario: '',
    password: '',
    company: ''
  };

  submitted = false

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private uiService: UiserviceService, private menuService: MenuService) {
  }

  ngOnInit() {
  }

  async login(fLogin: NgForm) {
    this.submitted = true;
    if (fLogin.invalid) {
      return;
    }
    const valido = await this.usuarioService.login(this.loginUser.usuario, this.loginUser.password, this.loginUser.company)
    if (valido) {
      this.navCtrl.navigateRoot('/listActivity', {animated: true});
    } else {
      this.submitted = false
      this.uiService.alertInformativa('Información de usuario no es correcta.')
    }
  }


}
