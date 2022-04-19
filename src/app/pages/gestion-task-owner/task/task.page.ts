import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModalController, NavController} from "@ionic/angular";
import {NavigationOptions} from "@ionic/angular/providers/nav-controller";
import {GestionTaskOwnerService} from "../../../services/gestion-task-owner.service";
import {AuthService} from "../../../services/auth.service";
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UiserviceService} from "../../../services/uiservice.service";
import {ModalListaComponent} from "../../../components/modal-lista/modal-lista.component";

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
  dotacion = []
  dotacionList
  taskForm: FormGroup;
  customPickerOptionI
  customPickerOptionF
  today = new Date().toISOString();
  minMaxDate;
  formattedToday = moment(this.today).format('DD/MM/YYYY')

  constructor(public router: Router, public navCtrl: NavController, public activatedRoute: ActivatedRoute,
              private modalController: ModalController, public gestionService: GestionTaskOwnerService,
              public authService: AuthService, public formBuilder: FormBuilder, public alertMsg: UiserviceService) {
    // moment.locale('es')
    this.activatedRoute.queryParams.subscribe((r: any) => {
      this.actividad = r
      this.dateIni = moment(this.actividad.inicio).format('YYYY-MM-DD HH:mm:ss')
      this.minMaxDate = moment(this.actividad.inicio).format('YYYY-MM-DD')
    })

    this.customPickerOptionI = {
      backdropDismiss: false,
      buttons: [{
        text: 'Limpiar',
        handler: () => {
          this.taskForm.controls['dateIniCtrl'].setValue(null)
          this.taskForm.controls['dateFinCtrl'].setValue(null)
        }
      }, {
        text: 'Guardar',
        handler: (val) => {
          this.dateIni = `${val.year.text}-${val.month.value}-${val.day.text} ${val.hour.text}:${val.minute.text}:00`
        }
      }]
    }

    this.customPickerOptionF = {
      backdropDismiss: false,
      buttons: [{
        text: 'Limpiar',
        handler: () => this.taskForm.controls['dateFinCtrl'].setValue(null)
      }, {
        text: 'Guardar',
        handler: (val) => {
          this.dateFin = `${val.year.text}-${val.month.value}-${val.day.text} ${val.hour.text}:${val.minute.text}:00`
        }
      }],
    }

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
    this.getlvdotdatetasksubpartidaot()
  }

  get errorControl() {
    return this.taskForm.controls;
  }

  enviar() {
    this.isSubmitted = true;
    if (this.taskForm.invalid) {
      return
    }
    this.alertMsg.showMessageOkCancel('Información', '¿Estás seguro de enviar?', 'Aceptar', 'Cancelar').then(r => {
      if (r.data) {
        const request = {
          userId: this.authService.user,
          companyIdUsr: this.authService.company,
          companyIdSelect: this.actividad.companyId,
          clientId: this.actividad.clientId,
          projectId: this.actividad.idproyecto,
          regIdOT: this.actividad.regIdOt,
          regIdSubpartida: this.actividad.regIdSubpartida,
          regIdTask: this.actividad.regIdTask,
          startDate: !this.dateIni ? null : moment(this.dateIni).format('DD/MM/YYYY HH:mm'),
          finishDate: !this.dateFin ? null : moment(this.dateFin).format('DD/MM/YYYY HH:mm'),
          flagExcep: this.flagExcep,
          obsExcep: this.obsExcep,
          fechaEjec: this.actividad.fecha,
          qtyEjec: this.cantModel === undefined || this.cantModel === null ? 0 : this.cantModel,
          hhPausa: this.pausaModel === undefined || this.pausaModel === null ? 0 : this.pausaModel,
          regsData: this.dotacion.map(dot => ({dni: dot.id}))
        }
        if (request.flagExcep === undefined) {
          delete request.flagExcep;
        }
        if (request.obsExcep === undefined) {
          delete request.obsExcep;
        }

        this.gestionService.putinfoownertasksubpartidaot(request).subscribe((response) => {
          if (response.code != 0) {
            this.alertMsg.alertInformativa(response.error);
            return
          }
          const navigation: NavigationOptions = {
            queryParams: this.actividad
          }
          this.alertMsg.presentToast('Actividad enviada', 'success')
          this.navCtrl.navigateBack('/listActivity', navigation)
        })
      }
    })

  }

  changeI() {
    const datesI = moment().format('DD/MMM/YYYY 08:00')
    if (this.dateIni) {
      return
    }
    this.dateIni = datesI
  }

  changeF() {
    //var date = new Date((new Date().getFullYear()), new Date().getMonth(), new Date().getDate()).setHours(18)
    //const datesF = new Date(date).toISOString();
    const datesF = moment(this.dateIni).format('DD/MMM/YYYY 18:00')

    if (this.dateFin) {
      return
    }
    this.dateFin = datesF
  }

  async selectDotacion() {
    const modal = await this.modalController.create({
      component: ModalListaComponent,
      componentProps: {
        title: 'Seleccione Dotación',
        swipeToClose: true,
        valores: this.dotacionList
      }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        if (data.data.dismissed) {
          return;
        }
        this.dotacion = data.data.respuesta
      }
    });
    return await modal.present();
  }

  getlvdotdatetasksubpartidaot() {
    const request = {
      userId: this.authService.company,
      companyIdUsr: this.authService.user,
      companyIdSelect: this.actividad.companyId,
      clientId: this.actividad.clientId,
      projectId: this.actividad.idproyecto,
      regIdOT: this.actividad.regIdOt,
      regIdSubpartida: this.actividad.regIdSubpartida,
      regIdTask: this.actividad.regIdTask,
      fechaTask: moment().format('DD-MM-YY'),
      responsableId: this.actividad.idresponsable
    }

    this.gestionService.getlvdotdatetasksubpartidaot(request).subscribe((response) => {
      this.dotacionList = response.detalles
      const dotacionSelected = this.dotacionList.filter(dot => dot.checked)
      this.dotacion = dotacionSelected
    });
  }

}
