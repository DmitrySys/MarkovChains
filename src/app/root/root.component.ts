import {Component, OnInit} from '@angular/core';
import {MapLoaderService} from "../services/map-loader.service";
import {Coords, LineLength} from "../graph/graph";

@Component({
  selector: 'mc-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less']
})
export class RootComponent implements OnInit {
  clickedToCoord: string = '';
  map;
  framePerSecond = 10;
  constructor(private mapService: MapLoaderService) {

  }
  coords: number[][];
  click = (e) => {
    const f = new Coords(1, 55.059484144794020, 82.91256437331396);   //Zaelchovskaya
    const t = new Coords(1,55.0288141255574500,82.937891836507380);   //Gagarinskaya
    this.mapService.getRoute(f, t).then(route => {
      this.clickedToCoord = (route.getLength()/1000).toString() + ' km.';
      route.getPaths().each(v => this.coords = v.geometry.getCoordinates());
      this.clickedToCoord = route.properties.get("distance");
      this.map.geoObjects.add(route);
      this.interpolate(this.coords);
      let placemark = this.mapService.addPlacemark([55.059484144794020, 82.91256437331396]);
      this.move(placemark.geometry,0,this.coords);
    });
  };

  //TODO: Add interpolation
  interpolate(coord: number[][])
  {

  }

  move(point:any,iterator:number,coords: number[][])
  {
      if(coords[iterator])
      {
        const nextIterator = iterator.toString().split('.')[1] ? iterator + 0.2 : iterator + 1;
        setTimeout(() => {
          point.setCoordinates(coords[iterator]);
          this.move(point,nextIterator,coords);
        },1000/this.framePerSecond);
      }
  }
  ngOnInit() {
    setTimeout(() => this.loadMap(), 1000);
  }

  loadMap() {
    this.mapService.getMap('map').then(map => {
        this.map = map;
        map.events.add('click', e => {
          const coords = e.get('coords');
          this.clickedToCoord = coords;
        });
        map.events.add('contextmenu', e => {

        });
      }
    );
  }
}
