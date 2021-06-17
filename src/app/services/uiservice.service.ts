import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class UiserviceService {

  isLoading = false;
  loading: HTMLIonLoadingElement;

  constructor(private alertController: AlertController, public loadingController: LoadingController, public toastController: ToastController) {
  }

  async alertInformativa(message: string, header?: string, cssClass?) {
    const alert = await this.alertController.create({
      header,
      cssClass,
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

  async presentLoading(message?: string, dismissback?: boolean): Promise<any> {
    this.isLoading = true;
    return await this.loadingController.create({
      message: message ? message : 'Cargando...',
      backdropDismiss: dismissback ? dismissback : false,
      spinner: 'circles'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'))
        }
      });
    });
  }

  async dismissLoading() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
    }
  }

  async presentToast(message, type: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: type,
      //cssClass: 'toast-custom-class',
      translucent: true
    });
    await toast.present();
  }


}
