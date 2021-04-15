import {Injectable} from '@angular/core';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class UiserviceService {

  constructor(private alertController: AlertController) {
  }

  async alertInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
  }




}
