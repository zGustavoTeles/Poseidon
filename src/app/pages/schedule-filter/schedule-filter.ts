import { Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html',
  styleUrls: ['./schedule-filter.scss'],
})
export class ScheduleFilterPage {
  ios: boolean;

  tracks: {name: string, icon: string, isChecked: boolean}[] = [];

  constructor(
    public confData: ConferenceData,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;

    //passado em uma série de nomes de faixas que devem ser excluídos (desmarcado)
    const excludedTrackNames = this.navParams.get('excludedTracks');

    this.confData.getTracks().subscribe((tracks: any[]) => {
      tracks.forEach(track => {
        this.tracks.push({
          name: track.name,
          icon: track.icon,
          isChecked: (excludedTrackNames.indexOf(track.name) === -1)
        });
      });
    });
  }

  selectAll(check: boolean) {
    // definir tudo como marcado ou desmarcado
    this.tracks.forEach(track => {
      track.isChecked = check;
    });
  }

  applyFilters() {
    //Passe de volta uma nova matriz de nomes de faixas para excluir
    const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}
