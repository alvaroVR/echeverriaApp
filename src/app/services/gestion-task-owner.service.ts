import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GestionTaskOwnerService {

  constructor(private api: ApiService) {
  }

//https://6k2nqb8tah.execute-api.us-east-1.amazonaws.com/eimrktplace/marketplace/getdettaskresponsable?userId=admin&companyIdUsr=90844000-5
  getdettaskresponsable(query) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdettaskresponsable`, query).subscribe((data: any) => {
      const response = {
        code: data.code,
        error: data.error,
        label: data.label,
        detalles: data.detalles.map((det) => {
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
          }
        })
      }
      subject.next(response);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  post(request) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putInfoOwnerTaskSubPartidaOT/`, null, request).subscribe((response: any) => {
      subject.next(response);
    }, error => {
      return subject.error(error);
    });
    return subject.asObservable();
  }

  //putInfoOwnerTaskSubPartidaOT?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=4600018331&regIdOT=1&regIdSubpartida=1&regIdTask=1&startDate=11-04-21&finishDate=11-04-21&flagExcep=0&obsExcep=No se pudo empezar, por mal clima
}
