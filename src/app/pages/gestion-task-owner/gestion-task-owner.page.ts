import {Component, OnInit} from '@angular/core';
import {GestionTaskOwnerService} from "../../services/gestion-task-owner.service";
import {AlertController, NavController} from "@ionic/angular";
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {UiserviceService} from "../../services/uiservice.service";

@Component({
  selector: 'app-gestion-task-owner',
  templateUrl: './gestion-task-owner.page.html',
  styleUrls: ['./gestion-task-owner.page.scss'],
})
export class GestionTaskOwnerPage implements OnInit {
  actividades: any = []
  items: any = [];
  detActividad;
  actividadesGl;

  constructor(public gestionService: GestionTaskOwnerService, private router: Router, private navCtrl: NavController,
              public alertController: AlertController,
              public activatedRoute: ActivatedRoute, public authService: AuthService, public uiService: UiserviceService) {
    this.items = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}
    ];

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
      this.actividadesGl = response
    }, error => {
      this.uiService.showMessageOkCancel('Error con los servicios', 'Existen problemas con la información', 'Reintentar').then(r => {
        this.prueba()
      })
    })
  }

  llamadaServicio() {
    const request = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    };
    this.gestionService.getdettaskresponsable(request).subscribe(response => {
      this.actividades = response.detalles
      this.actividadesGl = response
      this.uiService.dismissLoading()
    }, error => {
      this.uiService.showMessageOkCancel('Error con los servicios', 'Existen problemas con la información', 'Reintentar').then(r => {
        this.prueba()
      })
    })
  }

  asd() {
    return new Promise((resolve) => {
      this.actividades = this.actividades.map((det) => {
        return {
          proyect_name: det.proyect_name,
          idtask: det.idtask,
          taskname: det.taskname,
          qty_ejecutar: det.qty_ejecutar,
          start_date: det.start_date,
          finish_date: det.finish_date,
          clientId: det.idcliente,
          companyId: det.idcompany,
          idproyecto: det.idproyecto,
          cantInitiate: det.cantInitiate,
          regIdOt: det.idregot,
          hh_PTO: det.hh_PTO,
          idActivity: det.idActivity,
          regIdSubpartida: det.idregsubpartida,
          regIdTask: det.idregtask,
          fecha: det.fecha,
          tasks: det.tasks,
          status: det.status,
          uom: det.uom,
          expanded: false,
          selected: false
        };
      });
      resolve(true)
    })
  }

  detalleActividad(detalle, fecha, cantidad, inicio, status) {
    if (detalle.cantInitiate > 0 && status !== 'INITIATE') {
      let header = `Advertencia`
      let mensaje = `<div>Para ingresar debe finalizar las tareas con estado INITIATE </div>`
      let cssClass = 'warning'
      return this.uiService.alertInformativa(mensaje, header, cssClass)
    }
    const params = {
      clientId: detalle.clientId,
      companyId: detalle.companyId,
      expanded: detalle.expanded,
      finish_date: detalle.finish_date,
      hh_PTO: detalle.hh_PTO,
      idActivity: detalle.idActivity,
      idproyecto: detalle.idproyecto,
      idtask: detalle.idtask,
      subpartidaname: detalle.subpartidaname,
      proyect_name: detalle.proyect_name,
      qty_ejecutar: detalle.qty_ejecutar,
      qty_tot_ejec: detalle.qty_tot_ejec,
      regIdOt: detalle.regIdOt,
      regIdSubpartida: detalle.regIdSubpartida,
      regIdTask: detalle.regIdTask,
      selected: detalle.selected,
      status: detalle.status,
      start_date: detalle.start_date,
      taskname: detalle.taskname,
      uom: detalle.uom,
      fecha,
      cantidad,
      inicio
    }
    const navigationExtras: NavigationExtras = {
      queryParams: params
    }
    this.asd().then(() => {
      this.actividades.filter(act => act.idtask === detalle.idtask ? act.selected = true : act.selected = false)
      this.router.navigate(['/gestion-task-owner/task'], navigationExtras);
    })
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.actividades.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  async finishAll(actividad) {
    //putcloseactivity?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=4600018331&regIdOT=1&regIdSubpartida=1&regIdTask=1

    const alert = await this.alertController.create({
      subHeader: '¿Está seguro de finalizar esta actividad?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.uiService.presentLoading('Terminando actividades...')
            const request = {
              userId: this.authService.user,
              companyIdUsr: this.authService.company,
              companyIdSelect: actividad.companyId,
              clientId: actividad.clientId,
              projectId: actividad.idproyecto,
              regIdOT: actividad.regIdOt,
              regIdSubpartida: actividad.regIdSubpartida,
              regIdTask: actividad.regIdTask
            }
            this.gestionService.putcloseactivity(request).subscribe(r => {
              this.llamadaServicio()
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm() {

  }

}
