import {Component, OnInit} from '@angular/core';
import {PrincipioDiaService} from "../../services/principio-dia.service";
import {AuthService} from "../../services/auth.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-principio-dia',
  templateUrl: './principio-dia.page.html',
  styleUrls: ['./principio-dia.page.scss'],
})
export class PrincipioDiaPage implements OnInit {

  capataces;

  constructor(private principioService: PrincipioDiaService, private authService: AuthService, private navCtrl: NavController) {
  }


  ngOnInit() {
    this.getinfoiniciodiasupervisor()
  }

  getinfoiniciodiasupervisor() {
    const query = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    }
    this.principioService.getinfoiniciodiasupervisor(query).subscribe(response => {
      this.capataces = response.detalles
      console.log(this.capataces)
    })
  }

  navToDetail(detalle) {
    this.navCtrl.navigateForward(['principio-dia/detalle-pd', detalle]);
  }

  addActivity() {
    this.navCtrl.navigateForward(['principio-dia/crear-actividad']);
  }

}
