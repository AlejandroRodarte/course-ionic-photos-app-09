import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertController: AlertController
  ) { }

  async presentAlert(message: string): Promise<void> {

    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();

  }

}
