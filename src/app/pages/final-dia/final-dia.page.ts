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
  actividades = [];
  editEnabled = false
  value;
  oldValues;
  showValues = false
  sgmento = {
    colaborador: true,
    actividades: false
  }

  constructor(private finalDiaService: FinalDiaService, private authService: AuthService, private uiservice: UiserviceService) {
  }

  ngOnInit() {
    this.getinfofindiacapataz()
    this.getinfoactivityfindiacapataz()
  }

  getinfofindiacapataz(worker?) {
    const request = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    }
    this.finalDiaService.getinfofindiacapataz(request).subscribe(response => {
      this.trabajadores = response.detalles.map(trabajador => ({
        ...trabajador,
        expandable: false
      }));
      if (worker) {
        this.trabajadores.map(act => {
          act.expandable = act.dni === worker.dni
        })
      }
      this.showValues = true
    })
  }

  getinfoactivityfindiacapataz(worker?) {
    const request = {
      userId: this.authService.user,
      companyIdUsr: this.authService.company
    }
    this.finalDiaService.getinfoactivityfindiacapataz(request).subscribe(response => {
      this.actividades = response.detalles.map(actividad => ({
        ...actividad,
        expandable: false
      }));
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
      this.showValues = true
      e.target.complete();
    })
  }

  expandItem(trabajador) {


    let editionInProgress;
    this.trabajadores.forEach(work => {
      const search = work.actividades.find(act => act.editable === true)
      if (search) {
        editionInProgress = search
      }
    })

    if (editionInProgress) {
      this.uiservice.showMessageOkCancel('Existe una edición en progreso', 'Debe guardar antes de continuar', 'Continuar').then(r => {
        return
      })
      return
    }

    if (!trabajador.expandable) {
      this.trabajadores.map(act => {
        act.expandable = false
        act.editable = false
      })
    }

    trabajador.expandable = trabajador.expandable !== true;
  }

  editar(actividad, trabajador) {
    //const editionInProgress = trabajador.actividades.find(worker => worker.editable === true)
    let editionInProgress;
    this.trabajadores.forEach(work => {
      const search = work.actividades.find(act => act.editable === true)
      if (search) {
        editionInProgress = search
      }
    })
    if (editionInProgress) {
      this.uiservice.showMessageOkCancel('Existe una edición en progreso', 'Debe guardar antes de continuar', 'Guardar', 'Continuar Editando').then(r => {
        if (r.data) {
          const request = {
            userId: this.authService.user,
            companyId: editionInProgress.idcompany,
            clientId: editionInProgress.idcliente,
            projectId: editionInProgress.idproyecto,
            regOTId: editionInProgress.idregot,
            regSubpartidaId: editionInProgress.idregsubpartida,
            regTaskId: editionInProgress.idregactivity,
            fechaEjec: moment().format('DD-MM-YYYY'),
            dni: editionInProgress.dni,
            hh: editionInProgress.hh,
            hhExtras: editionInProgress.hhextras
          }
          this.uiservice.presentLoading('Ejecutando edición')
          this.finalDiaService.putfindiacapatazdothh(request).subscribe(r => {
            this.uiservice.dismissLoading()
            if (r.code !== 0) {
              this.uiservice.alertInformativa(r.error, 'Error')
            }
            //actividad.editable = actividad.editable !== true
            this.uiservice.presentToast('Actividad Editada', 'success')
            this.getinfofindiacapataz(trabajador)
          })
        }
      })
      return
    }
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

  segmentChanged(ev) {
    this.sgmento.actividades = ev.detail.value === 'Actividades'
    this.sgmento.colaborador = ev.detail.value === 'Colaborador'
  }

}
