import {Component, OnInit} from '@angular/core';
import {MapLoaderService} from "../services/map-loader.service";
import {Coords, LineLength, NodeCoords, User} from "../graph/graph";

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
  curPlaceMark;
  curRoute;
  coords: number[][];
  lastP;
  click = (e) => {
    if(this.curRoute && this.curPlaceMark)
    {
      this.map.geoObjects.remove(this.curRoute);
      this.map.geoObjects.remove(this.curPlaceMark);
    }
    var points = NodeCoords;
    const f = this.lastP ? this.lastP: points[Math.floor(Math.random() * points.length)];
    const t = points[Math.floor(Math.random() * points.length)];
    this.lastP = t;
    this.mapService.getRoute(f, t).then(route => {
      this.curRoute = route;
      this.clickedToCoord = (route.getLength()/1000).toString() + ' km.';
      route.getPaths().each(v => this.coords = v.geometry.getCoordinates());
      this.clickedToCoord = route.properties.get("distance");
      this.map.geoObjects.add(route);
      this.curPlaceMark = this.mapService.addPlacemark([f.x,f.y]);
      this.move(this.curPlaceMark.geometry,0,this.coords);
    });
  };

  getNextDirection(user:User):void
  {
    //TODO Implement Markov's chains
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
      } else {
        this.click(null);
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
