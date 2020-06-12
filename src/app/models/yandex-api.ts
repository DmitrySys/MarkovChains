export interface IPlacemark {
  geometry: IGeometry;
  options: any;
  events: any;
  guid: string;
  properties:any
}

export interface IGeometry {
  options: any;
  _coordinates: number[];
  _bounds: Array<[][]>;

  setCoordinates(coords: number[]);
}

export interface IClickEvent {
  originalEvent: {
    target: IPlacemark
  }
}

export interface IMap {
  options:any
  events: {
    add(event:string,callback);
    remove(event:string,any?);
  },
  behaviors: {
    disable(el: string);
    enable(el: string);
  }
  geoObjects: {
    add(obj:any);
    remove(obj:any);
  }
  action: {
    execute(action);
    Continuous();
  }

  panTo(points: number[][], options?: { delay: number }):Promise<any>;

  getCenter();

  getZoom();

  destroy();
  setCenter(center: number[], zoom?: number, options?: { checkZoomRange: boolean });
  converter:any;
}

export interface IYandexMapsApi {
  Map(element: HTMLDivElement, opts: { center: number[]; zoom: number }): void;

  Placemark(coords: number[],_,_2): void;
  Circle(opts:any): void;
  coordSystem:any;
}
