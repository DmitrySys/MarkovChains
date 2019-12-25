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

  public addPlacemark(coordinates: number[]): IPlacemark {
    const placemark = <IPlacemark>new this.ymapsApi.Placemark(coordinates);
    this.map.geoObjects.add(placemark);
    placemark.guid = Guid.newGuid();
    return placemark;
  }
}
