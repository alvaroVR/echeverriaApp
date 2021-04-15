import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {NavController} from "@ionic/angular";
import {UiserviceService} from "../../services/uiservice.service";

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

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private uiService: UiserviceService) {
  }

  ngOnInit() {
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const valido = await this.usuarioService.login(this.loginUser.usuario, this.loginUser.password, this.loginUser.company)
    if (valido) {
      this.navCtrl.navigateRoot('/gestion-task-owner', {animated: true});
    } else {
      this.uiService.alertInformativa('Información de usuario no es correcta.')
    }
  }


}
