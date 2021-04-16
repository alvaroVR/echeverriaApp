import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {NavigationOptions} from "@ionic/angular/providers/nav-controller";
import {GestionTaskOwnerService} from "../../../services/gestion-task-owner.service";
import {AuthService} from "../../../services/auth.service";
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  actividad;
  dateIni;
  dateFin;
  flagExcep;
  obsExcep;

  constructor(public router: Router, public navCtrl: NavController, public activatedRoute: ActivatedRoute, public gestionService: GestionTaskOwnerService,
              public authService: AuthService) {
    this.activatedRoute.queryParams.subscribe((r: any) => {
      this.actividad = r
    })

  }

  ngOnInit() {
  }

  enviar() {

    const request = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company,
      companyIdSelect: this.actividad.companyId,
      clientId: this.actividad.clientId,
      projectId: this.actividad.idproyecto,
      regIdOT: this.actividad.regIdOt,
      regIdSubpartida: this.actividad.regIdSubpartida,
      regIdTask: this.actividad.regIdTask,
      startDate: moment(this.dateIni).format('DD/MM/YYYY'),
      finishDate: moment(this.dateFin).format('DD/MM/YYYY'),
      flagExcep: this.flagExcep,
      obsExcep: this.obsExcep
    }
    this.gestionService.post(request).subscribe(() => {
      const navigation: NavigationOptions = {
        queryParams: this.actividad
      }
      this.navCtrl.navigateBack('/gestion-task-owner', navigation)
    })
  }

}
