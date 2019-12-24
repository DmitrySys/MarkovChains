import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import ymaps from 'ymaps';
import {Coords} from "../graph/graph";
@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {
  map;
  isLoading:boolean = true;
  ymapsApi: any;
  constructor() {
    this.init().then(_ => this.isLoading = false);
  }
  async init() : Promise<void>
  {
    this.ymapsApi = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=93b15e8c-75b3-4e6c-b545-af9d7ce983cb&lang=ru_RU');
  }
  async getMap(element: string): Promise<any> {
    const mapContainer = document.createElement("div");
    document.getElementById(element).appendChild(mapContainer);
    mapContainer.style.height = "800px";
    mapContainer.style.width = "100%";
    const map = new this.ymapsApi.Map(mapContainer, {
      center: [55.00910478591716, 82.93678258251948],
      zoom: 14
    });
    this.map = map;
    return map;
  }
  addPlacemark(coordinates:number[]){
    var placemark = new this.ymapsApi.Placemark(coordinates);
    this.map.geoObjects.add(placemark);
    return placemark;
  }
  async getRoute(from:Coords,to:Coords) {
    let r = await this.ymapsApi.route([
      {
        type: 'wayPoint',
        point: [from.x,from.y]
      },
      {
        type: 'wayPoint',
        point: [to.x,to.y]
      }
    ], {
    });
    return r;
  }
}
