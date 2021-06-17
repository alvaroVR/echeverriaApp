import {Component, OnInit} from '@angular/core';
import {ModalComponent} from "../../../components/modal/modal.component";
import {ModalController, NavController} from "@ionic/angular";
import {PrincipioDiaService} from "../../../services/principio-dia.service";
import {AuthService} from "../../../services/auth.service";
import {ModalService} from "../../../components/modal/modal.service";
import * as moment from 'moment';
import {ModalListaComponent} from "../../../components/modal-lista/modal-lista.component";
import {UiserviceService} from "../../../services/uiservice.service";

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.page.html',
  styleUrls: ['./crear-actividad.page.scss'],
})
export class CrearActividadPage implements OnInit {
  formulario = {
    empresa: {nombre: null, id: null, checked: false},
    cliente: {nombre: null, id: null, checked: false},
    proyecto: {nombre: null, id: null, checked: false},
    ot: {nombre: null, id: null, checked: false},
    partida: {nombre: null, id: null, checked: false},
    responsable: {nombre: null, id: null, checked: false},
    dotacion: []
  }
  getdomcompaniesRequest;
  warehouseList;
  businessList;
  projectList;
  activityPlan;
  otList;
  partidaList;
  responsablesList;
  dotacionList;

  empresaModel;

  idActividadModel;
  actividadModel;
  uomModel;
  qtyModel;
  hhModel;

  constructor(private modalController: ModalController, private authService: AuthService, private principioService: PrincipioDiaService,
              public alertMsg: UiserviceService, public navCtrl: NavController) {
  }

  ngOnInit() {
    this.getdomcompanies()
  }

  async selectEmpresa() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        title: 'Seleccione Empresa',
        swipeToClose: true,
        valores: this.warehouseList
      }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        if (data.data.dismissed) {
          return;
        }

        this.formulario.empresa.nombre = data.data.respuesta.nombre
        this.formulario.empresa.id = data.data.respuesta.id
        this.formulario.empresa.checked = data.data.respuesta.checked
        this.warehouseList.filter(wh => wh.id === this.formulario.empresa.id && this.formulario.empresa.checked === true ? wh.checked = true : wh.checked = false);
        this.getdomclientes()
      }
    });
    return await modal.present();
  }

  async selectCliente() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        title: 'Seleccione Cliente',
        swipeToClose: true,
        valores: this.businessList
      }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        if (data.data.dismissed) {
          return;
        }
        this.formulario.cliente.nombre = data.data.respuesta.nombre
        this.formulario.cliente.id = data.data.respuesta.id
        this.formulario.cliente.checked = data.data.respuesta.checked
        this.businessList.filter(cliente => cliente.id === this.formulario.cliente.id && this.formulario.cliente.checked === true ? cliente.checked = true : cliente.checked = false);
        this.getdomproyectos()
      }
    });
    return await modal.present();
  }

  async selectProyecto() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        title: 'Seleccione Proyecto',
        swipeToClose: true,
        valores: this.projectList
      }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        if (data.data.dismissed) {
          return;
        }
        this.formulario.proyecto.nombre = data.data.respuesta.nombre;
        this.formulario.proyecto.id = data.data.respuesta.id;
        this.formulario.proyecto.checked = data.data.respuesta.checked;
        this.projectList.filter(proyecto => proyecto.id === this.formulario.proyecto.id && this.formulario.proyecto.checked === true ? proyecto.checked = true : proyecto.checked = false);
        this.getdetactivitypplan();
        this.getdetlistot();
        this.getdomtasksubpartidasresponsables();
      }
    });
    return await modal.present();
  }

  async selectOt() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        title: 'Seleccione ST',
        swipeToClose: true,
        valores: this.otList
      }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        if (data.data.dismissed) {
          return;
        }
        this.formulario.ot.nombre = data.data.respuesta.nombre
        this.formulario.ot.id = data.data.respuesta.id
        this.formulario.ot.checked = data.data.respuesta.checked
        this.otList.filter(ot => ot.id === this.formulario.ot.id && this.formulario.ot.checked === true ? ot.checked = true : ot.checked = false);
        this.getdetlistsubpartidas()
      }
    });
    return await modal.present();
  }

  async selectPartida() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        title: 'Seleccione Partida',
        swipeToClose: true,
        valores: this.partidaList
      }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        if (data.data.dismissed) {
          return;
        }
        this.formulario.partida.nombre = data.data.respuesta.nombre
        this.formulario.partida.id = data.data.respuesta.id
        this.formulario.partida.checked = data.data.respuesta.checked
        this.partidaList.filter(partida => partida.id === this.formulario.partida.id && this.formulario.partida.checked === true ? partida.checked = true : partida.checked = false);
      }
    });
    return await modal.present();
  }

  async selectResponsable() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        title: 'Seleccione Responsable',
        swipeToClose: true,
        valores: this.responsablesList
      }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        if (data.data.dismissed) {
          return;
        }
        this.formulario.responsable.nombre = data.data.respuesta.nombre
        this.formulario.responsable.id = data.data.respuesta.id
        this.formulario.responsable.checked = data.data.respuesta.checked
        this.responsablesList.filter(responsable => responsable.id === this.formulario.responsable.id && this.formulario.responsable.checked === true ? responsable.checked = true : responsable.checked = false);
        this.getlvdotdatetasksubpartidaot()
      }
    });
    return await modal.present();
  }

  getdomcompanies() {
    this.getdomcompaniesRequest = {
      companyId: this.authService.company,
      userId: this.authService.user
    };

    this.principioService.getdomcompanies(this.getdomcompaniesRequest).subscribe((response) => {
      this.warehouseList = response.detalles;
    });
  }

  getdomclientes() {
    const getdomclientesRequest = {
      companyIdUsr: this.authService.company,
      userId: this.authService.user,
      companyIdSelect: this.formulario.empresa.id
    };
    this.principioService.getdomclientes(getdomclientesRequest).subscribe((response) => {
      this.businessList = response.detalles;
    });
  }

  getdomproyectos() {
    const getdomproyectosRequest = {
      companyIdUsr: this.authService.company,
      userId: this.authService.user,
      companyIdSelect: this.formulario.empresa.id,
      clientId: this.formulario.cliente.id
    };

    this.principioService.getdomproyectos(getdomproyectosRequest).subscribe((response) => {
      this.projectList = response.detalles;
    });
  }

  getdetactivitypplan() {
    const request = {
      userId: this.authService.company,
      companyIdUsr: this.authService.user,
      companyIdSelect: this.formulario.empresa.id,
      clientId: this.formulario.cliente.id,
      projectId: this.formulario.proyecto.id
    };

    this.principioService.getdetactivitypplan(request).subscribe(r => {
      this.activityPlan = r.detalles
    }, error => {
    })

  }

  getdetlistot() {
    const request = {
      userId: this.authService.company,
      companyIdUsr: this.authService.user,
      companyIdSelect: this.formulario.empresa.id,
      clientId: this.formulario.cliente.id,
      projectId: this.formulario.proyecto.id
    };

    this.principioService.getdetlistot(request).subscribe(r => {
      this.otList = r.detalles
    }, error => {
    })
  }

  getdetlistsubpartidas() {
    const getdetlistsubpartidasRequest = {
      userId: this.authService.company,
      companyIdUsr: this.authService.user,
      companyIdSelect: this.formulario.empresa.id,
      clientId: this.formulario.cliente.id,
      projectId: this.formulario.proyecto.id,
      regIdOT: this.formulario.ot.id
    };

    this.principioService.getdetlistsubpartidas(getdetlistsubpartidasRequest).subscribe(response => {
      this.partidaList = response.detalles


    }, error => {
    })
  }

  getdomtasksubpartidasresponsables() {
    const request = {
      userId: this.authService.company,
      companyIdUsr: this.authService.user,
      companyIdSelect: this.formulario.empresa.id,
      clientId: this.formulario.cliente.id,
      projectId: this.formulario.proyecto.id,
    };

    this.principioService.getdomtasksubpartidasresponsables(request).subscribe((response) => {
      this.responsablesList = response.detalles
    });
  }

  getlvdotdatetasksubpartidaot() {
    const request = {
      userId: this.authService.company,
      responsableId: this.formulario.responsable.id
    }
    //getdotaciontaskemergente?userId=cbernabe&responsableId=14099105-8
    this.principioService.getdotaciontaskemergente(request).subscribe((response) => {
      this.dotacionList = response.detalles
    });
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
        this.formulario.dotacion = data.data.respuesta
      }
    });
    return await modal.present();
  }

  publicar() {
    const request = {
      userId: this.authService.company,
      companyUSrId: this.authService.user,
      companySelectId: this.formulario.empresa.id,
      clientId: this.formulario.cliente.id,
      projectId: this.formulario.proyecto.id,
      regOTId: this.formulario.ot.id,
      regSubpartidaId: this.formulario.partida.id,
      taskId: this.idActividadModel,
      taskName: this.actividadModel,
      uom: this.uomModel,
      responsableId: this.formulario.responsable.id,
      qtyEjec: this.qtyModel,
      hhEjec: this.hhModel,
      regsData: this.formulario.dotacion.map(dot => ({dni: dot.id}))
    }
    this.alertMsg.showMessageOkCancel('Información', '¿Estás seguro de publicar?', 'Publicar', 'Cancelar').then(r => {
      if (r.data) {
        this.principioService.puttaskemergentesubpartidaot(request).subscribe((response) => {
          if (response.code != 0) {
            this.alertMsg.alertInformativa(response.error);
            return
          }
          this.alertMsg.presentToast('Actividad publicada', 'success')
          this.navCtrl.navigateBack('/principio-dia')
        })
      }
    })
  }

  dismiss() {

  }


}
