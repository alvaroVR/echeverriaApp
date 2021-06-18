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
  ordenar = true;

  constructor(private principioService: PrincipioDiaService, private authService: AuthService, private navCtrl: NavController) {
  }


  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getinfoiniciodiasupervisor()
  }

  doRefresh(event) {
    const query = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    }
    this.principioService.getinfoiniciodiasupervisor(query).subscribe(response => {
      this.capataces = response.detalles.map(cap => {
        return {
          ...cap,
          expandable: false
        };
      });
      event.target.complete();
    })
  }

  getinfoiniciodiasupervisor() {
    const query = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    }
    this.principioService.getinfoiniciodiasupervisor(query).subscribe(response => {
      this.capataces = response.detalles.map(cap => {
        return {
          ...cap,
          expandable: false
        };
      });
    });
  }

  navToDetail(detalle) {
    this.navCtrl.navigateForward(['principio-dia/detalle-pd', detalle]);
  }

  addActivity() {
    this.navCtrl.navigateForward(['principio-dia/crear-actividad']);
  }

  onRenderItems(event) {
    const draggedItem = this.capataces.splice(event.detail.from, 1)[0];
    this.capataces.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }

  reordenar() {
    this.ordenar = this.ordenar !== true;
  }

  expandItem(capataz) {
    if (!capataz.expandable) {
      this.capataces.map(capat => {
        capat.expandable = false
      })
    }
    capataz.expandable = capataz.expandable !== true;
  }

}
