export interface IPlacemark {
  geometry: IGeometry;
  options: any;
  events: any;
  guid: string;
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
  events: {
    add(event:string,callback);
    remove(event:string);
  },
  behaviors: {
    disable(el: string);
    enable(el: string);
  }
  geoObjects: {
    add(placemark: IPlacemark);
    remove(placemark: IPlacemark);
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
}

export interface IYandexMapsApi {
  Map(element: HTMLDivElement, opts: { center: number[]; zoom: number }): void;

  Placemark(coords: number[]): void;
}
