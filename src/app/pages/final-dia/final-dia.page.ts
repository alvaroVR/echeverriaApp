import {Component, OnInit} from '@angular/core';
import {FinalDiaService} from "../../services/final-dia.service";
import {AuthService} from "../../services/auth.service";
import * as moment from 'moment';
import {UiserviceService} from "../../services/uiservice.service";

@Component({
  selector: 'app-final-dia',
  templateUrl: './final-dia.page.html',
  styleUrls: ['./final-dia.page.scss'],
})
export class FinalDiaPage implements OnInit {
  trabajadores = [];
  editEnabled = false
  value;
  oldValues;

  constructor(private finalDiaService: FinalDiaService, private authService: AuthService, private uiservice: UiserviceService) {
  }

  ngOnInit() {
    this.getinfofindiacapataz()
  }

  getinfofindiacapataz() {
    const request = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    }
    this.finalDiaService.getinfofindiacapataz(request).subscribe(response => {
      this.trabajadores = response.detalles.map(trabajador => {
        return {
          ...trabajador,
          expandable: false
        };
      });
    })
  }

  doRefresh(e) {
    const request = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    }
    this.finalDiaService.getinfofindiacapataz(request).subscribe(response => {
      this.trabajadores = response.detalles.map(trabajador => {
        return {
          ...trabajador,
          expandable: false
        };
      });
      e.target.complete();
    })
  }

  expandItem(trabajador) {
    if (!trabajador.expandable) {
      this.trabajadores.map(act => {
        act.expandable = false
        act.editable = false
      })
    }
    trabajador.expandable = trabajador.expandable !== true;
  }

  editar(actividad) {
    actividad.editable = true
  }

  terminarEdicion(actividad) {
    this.uiservice.showMessageOkCancel('¿Estás seguro de terminar edición?', '', 'Si', 'Cancelar').then(r => {
      if (r.data) {
        const request = {
          userId: this.authService.user,
          companyId: actividad.idcompany,
          clientId: actividad.idcliente,
          projectId: actividad.idproyecto,
          regOTId: actividad.idregot,
          regSubpartidaId: actividad.idregsubpartida,
          regTaskId: actividad.idregactivity,
          fechaEjec: moment().format('DD-MM-YYYY'),
          dni: actividad.dni,
          hh: actividad.hh,
          hhExtras: actividad.hhextras
        }
        this.uiservice.presentLoading('Ejecutando edición')
        this.finalDiaService.putfindiacapatazdothh(request).subscribe(r => {
          this.uiservice.dismissLoading()
          if (r.code !== 0) {
            this.uiservice.alertInformativa(r.error, 'Error')
          }
          actividad.editable = actividad.editable !== true
          this.uiservice.presentToast('Actividad Editada', 'success')
          this.getinfofindiacapataz()
        })
        return
      }

    })

  }

}
