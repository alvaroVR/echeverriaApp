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
      buttons: ['Aceptar']
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
  }

  async showMessageOkCancel(title, message, txtBtn1?, txtBtn2?) {
    let choice
    const alert = await this.alertController.create({
      header: title,
      subHeader: message,
      buttons: [{
        text: txtBtn1,
        handler: () => {
          alert.dismiss(true)
          return false
        }
      }, {
        text: txtBtn2,
        handler: () => {
          alert.dismiss(false);
          return false;
        }
      }]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data
    })
    return choice
  }


}
