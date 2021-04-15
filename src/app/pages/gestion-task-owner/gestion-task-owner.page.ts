import {Component, OnInit} from '@angular/core';
import {GestionTaskOwnerService} from "../../services/gestion-task-owner.service";

@Component({
  selector: 'app-gestion-task-owner',
  templateUrl: './gestion-task-owner.page.html',
  styleUrls: ['./gestion-task-owner.page.scss'],
})
export class GestionTaskOwnerPage implements OnInit {

  constructor(public gestionService: GestionTaskOwnerService) {
  }

  ngOnInit() {
    this.prueba()
  }

  prueba() {
    const request = {
      userId: 'cbernabe',
      companyIdUsr: '90844000-5'
    };
    this.gestionService.getdettaskresponsable(request).subscribe(response => {
      debugger
    })
  }

}
