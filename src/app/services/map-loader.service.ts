import {Injectable} from '@angular/core';
import ymaps from 'ymaps';
import {IMap, IPlacemark, IYandexMapsApi} from "../models/yandex-api";
import {Guid} from "../tools/guid";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {
  private map: IMap;
  private ymapsApi: IYandexMapsApi;
  private isLoading: boolean = true;

  constructor() {
    this.init().then(_ => this.isLoading = false);
  }

  public async init(): Promise<void> {
    this.ymapsApi = await ymaps.load(environment.mapConfig.url);
  }

  public async getMap(element: string): Promise<any> {
    const mapContainer = document.createElement("div");
    document.getElementById(element).appendChild(mapContainer);
    mapContainer.style.height = "600px";
    mapContainer.style.width = "100%";
    const map = new this.ymapsApi.Map(mapContainer, {
      center: environment.mapConfig.coords,
      zoom: environment.mapConfig.zoom
    });
    this.map = map;
    return map;
  }
  public convertBrowserPxToMapCoords(coords:number[])
  {
    const projection = this.map.options.get('projection');
    return projection.fromGlobalPixels(
      this.map.converter.pageToGlobal(coords), this.map.getZoom()
    );
  }
  public addPlacemark(coordinates: number[],hint?:string): IPlacemark {
    const placemark = <IPlacemark>new this.ymapsApi.Placemark(coordinates,{},{
      draggable: true
    });
    this.map.geoObjects.add(placemark);
    placemark.properties.set('hintContent',hint);
    placemark.guid = Guid.newGuid();
    return placemark;
  }
  public addBaseStation(coordinates:number[],diameter:number) {
    const circle = new this.ymapsApi.Circle([coordinates,diameter]);
    this.map.geoObjects.add(circle);
    return circle;
  }
  public getDistance(obj_1:number[],obj_2:number[])
  {
    return this.ymapsApi.coordSystem.geo.getDistance(obj_1, obj_2);
  }
  addOneClickListener(callback:(e) =>any):void
  {
    const listener = this.map.events.add('click',(e) => {
      callback(e);
      this.map.events.remove(listener);
    });
  }
}
