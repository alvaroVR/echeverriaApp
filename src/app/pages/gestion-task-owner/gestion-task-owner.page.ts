import {Component, OnInit} from '@angular/core';
import {GestionTaskOwnerService} from "../../services/gestion-task-owner.service";
import {NavController} from "@ionic/angular";
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-gestion-task-owner',
  templateUrl: './gestion-task-owner.page.html',
  styleUrls: ['./gestion-task-owner.page.scss'],
})
export class GestionTaskOwnerPage implements OnInit {
  actividades: any = []
  detActividad;

  constructor(public gestionService: GestionTaskOwnerService, private router: Router, private navCtrl: NavController,
              public activatedRoute: ActivatedRoute, public authService: AuthService) {

  }

  ngOnInit() {
    this.prueba()
  }

  ionViewWillEnter() {
    this.prueba();
    //this.activatedRoute.queryParams.subscribe(r => {
    //  if (r) {
    //    this.actividades = this.actividades.filter(actividad => actividad.idtask !== r.idtask)
    //  }
    //})
  }

  prueba() {
    const request = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    };
    this.gestionService.getdettaskresponsable(request).subscribe(response => {
      this.actividades = response.detalles
    })
  }

  asd() {
    return new Promise((resolve) => {
      this.actividades = this.actividades.map((det) => {
        return {
          proyect_name: det.proyect_name,
          idtask: det.idtask,
          qty_ejecutar: det.qty_ejecutar,
          start_date: det.start_date,
          finish_date: det.finish_date,
          clientId: det.clientId,
          companyId: det.companyId,
          idproyecto: det.idproyecto,
          regIdOt: det.regIdOt,
          regIdSubpartida: det.regIdSubpartida,
          regIdTask: det.regIdTask,
          fecha: det.fecha,
          selected: false
        };
      });
      resolve(true)
    })
  }

  detalleActividad(detalle) {
    const navigationExtras: NavigationExtras = {
      queryParams: detalle
    }
    this.asd().then(() => {
      this.actividades.filter(act => act.idtask === detalle.idtask ? act.selected = true : act.selected = false)
      this.router.navigate(['/gestion-task-owner/task'], navigationExtras);
    })
  }

}
