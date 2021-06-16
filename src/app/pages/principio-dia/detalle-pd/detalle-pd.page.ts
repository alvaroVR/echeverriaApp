import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {ModalComponent} from "../../../components/modal/modal.component";

@Component({
  selector: 'app-detalle-pd',
  templateUrl: './detalle-pd.page.html',
  styleUrls: ['./detalle-pd.page.scss'],
})
export class DetallePdPage implements OnInit {
  detallePrincipio;

  constructor(private route: ActivatedRoute, private modalController: ModalController) {
    this.detallePrincipio = this.route.snapshot.params
  }

  ngOnInit() {
  }

}
