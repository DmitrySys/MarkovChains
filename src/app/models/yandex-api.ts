export interface IPlacemark {
  geometry: IGeometry;
  options: any;
  events:any;
  guid:string;
}

export interface IGeometry {
  options: any;
  _coordinates: number[];
  _bounds: Array<[][]>;
  setCoordinates(coords: number[]);
}
export interface IClickEvent {
  originalEvent:{
    target:IPlacemark
  }
}
export interface IMap {
  events:{
    add();
  },
  geoObjects:{
    add(placemark:IPlacemark);
    remove(placemark:IPlacemark);
  }
}
export interface IYandexMapsApi {
  Map(element: HTMLDivElement, opts: { center: number[]; zoom: number }):void;
  Placemark(coords:number[]):void;
}
