import {Injectable} from '@angular/core';
import {ModalComponent} from "./modal.component";
import {ModalController} from "@ionic/angular";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public onClose: Subject<any>;
  modal;
  data;

  constructor(private modalController: ModalController) {
  }

  public async createModal(title: string, swipeToClose: boolean, params) {
    this.modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        title,
        swipeToClose,
        valores: params
      }
    })
    this.modal.onDidDismiss().then(data => {
      if (data) {
        return data
      }
    });

    return await this.modal.present();

  }

  async closed(){
    const value = await this.modal.onWillDismiss();
  }

  dismiss(value) {
    this.data = value
  }


}
