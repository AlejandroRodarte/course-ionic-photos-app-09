import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input()
  public coords: string;

  @ViewChild('map', { static: true })
  public map: ElementRef;

  constructor() { }

  ngOnInit() {

    mapboxgl.accessToken = environment.mapboxApiKey;

    if (this.coords) {

      const [latitud, longitud] = this.coords.split(',');

      const map = new mapboxgl.Map({
        container: this.map.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [+longitud, +latitud],
        zoom: 15
      });

      const marker = new mapboxgl
                          .Marker()
                          .setLngLat([+longitud, +latitud])
                          .addTo(map);

    }

  }

}
