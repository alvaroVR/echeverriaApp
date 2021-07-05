import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PrincipioDiaService {

  constructor(private api: ApiService) {
  }

  //getinfoiniciodiasupervisor?userId=cbernabe&companyIdUsr=90844000-5
  getinfoiniciodiasupervisor(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getinfoiniciodiasupervisor2`, query).subscribe((response: any) => {

      subject.next(response);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  getdomcompanies(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomcompanies`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(ot => ({
            id: ot.id,
            nombre: ot.nombre,
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  getdomclientes(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomclientes`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(ot => ({
            id: ot.id,
            nombre: ot.nombre,
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  getdomproyectos(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomproyectos`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(ot => ({
            id: ot.id,
            nombre: ot.nombre,
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  getdetactivitypplan(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdetactivitypplan`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(ot => ({
            id: ot.idproyecto,
            nombre: ot.project_name,
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  getdetlistot(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdetlistot`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(ot => ({
            id: ot.idreg,
            nombre: ot.jobname ? ot.jobname : '',
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;

  }

  getdetlistsubpartidas(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdetlistsubpartidas`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(ot => ({
            id: ot.idreg,
            nombre: ot.nombre ? ot.nombre : '',
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  getdomtasksubpartidasresponsables(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomtasksubpartidasresponsables`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(resp => ({
            id: resp.dni,
            nombre: resp.nombre ? resp.nombre : '',
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  getlvdotdatetasksubpartidaot(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getlvdotdatetasksubpartidaot`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(resp => ({
            id: resp.dni,
            nombre: resp.nombre ? resp.nombre : '',
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  getdotaciontaskemergente(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdotaciontaskemergente`, query).subscribe((response: any) => {
      const respuesta = {
        code: response.code,
        error: response.error,
        label: response.label,
        detalles: response.detalles.map(resp => ({
            id: resp.dni,
            nombre: resp.nombre ? resp.nombre : '',
            checked: false
          }))
      }
      subject.next(respuesta);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  puttaskemergentesubpartidaot(request) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/puttaskemergentesubpartidaot`, request).subscribe((response: any) => {
      subject.next(response);
    }, error => subject.error(error));
    return subject.asObservable();
  }

}
