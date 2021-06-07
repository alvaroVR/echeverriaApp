import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {NavigationOptions} from "@ionic/angular/providers/nav-controller";
import {GestionTaskOwnerService} from "../../../services/gestion-task-owner.service";
import {AuthService} from "../../../services/auth.service";
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UiserviceService} from "../../../services/uiservice.service";

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
  cantModel;
  pausaModel;
  isSubmitted = false;

  taskForm: FormGroup;

  constructor(public router: Router, public navCtrl: NavController, public activatedRoute: ActivatedRoute, public gestionService: GestionTaskOwnerService,
              public authService: AuthService, public formBuilder: FormBuilder, public alertMsg: UiserviceService) {
    this.activatedRoute.queryParams.subscribe((r: any) => {
      this.actividad = r
      this.dateIni = this.actividad.inicio
    })


  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      cantCtrl: [''],
      dateIniCtrl: [''],
      dateFinCtrl: [''],
      pausaCtrl: [''],
      flagExcepCtrl: [''],
      obsExcepCtrl: ['']
    })
  }

  get errorControl() {
    return this.taskForm.controls;
  }

  enviar() {
    this.isSubmitted = true;
    if (this.taskForm.invalid) {
      return
    }

    const request = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company,
      companyIdSelect: this.actividad.companyId,
      clientId: this.actividad.clientId,
      projectId: this.actividad.idproyecto,
      regIdOT: this.actividad.regIdOt,
      regIdSubpartida: this.actividad.regIdSubpartida,
      regIdTask: this.actividad.regIdTask,
      startDate: this.dateIni === undefined || this.dateIni === null ? null : moment(this.dateIni).format('DD/MM/YYYY HH:mm'),
      finishDate: this.dateFin === undefined || this.dateFin === null ? null : moment(this.dateFin).format('DD/MM/YYYY HH:mm'),
      flagExcep: this.flagExcep,
      obsExcep: this.obsExcep,
      fechaEjec: this.actividad.fecha,
      qtyEjec: this.cantModel === undefined || this.cantModel === null ? 0 : this.cantModel,
      hhPausa: this.pausaModel === undefined || this.pausaModel === null ? 0 : this.pausaModel,
    }
    if (request.flagExcep === undefined) {
      delete request.flagExcep;
    }
    if (request.obsExcep === undefined) {
      delete request.obsExcep;
    }
    this.gestionService.post(request).subscribe((response) => {
      if (response.code != 0) {
        this.alertMsg.alertInformativa(response.error);
        return
      }
      const navigation: NavigationOptions = {
        queryParams: this.actividad
      }
      this.navCtrl.navigateBack('/gestion-task-owner', navigation)
    })
  }

}
