import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async presentAlert(message: string): Promise<void> {

    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();

  }

  async presentToast(message: string): Promise<void> {

    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000
    });

    await toast.present();

  }

}
