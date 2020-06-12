import {ProbablyMatrix} from "../tools/probabilityMatrix";
import {IPlacemark} from "./yandex-api";
import {Observable, Subject} from "rxjs";
import {IRsprInfo} from "./baseStation";

export enum Direction {
  U, R, D, L, UR, DR, DL, UL
}
export class BaseCoords {
  get coords_y(): number {
    return this._coords_y;
  }

  set coords_y(value: number) {
    this._onChangeEventEmitter.next(<ICoordsChangeEvent>{
      newVal: [this.coords_x,value],
      prevVal:[this.coords_x,this.coords_y],
    });
    this._coords_y = value;
  }
  get coords_x(): number {
    return this._coords_x;
  }
  set coords_x(value: number) {
    this._onChangeEventEmitter.next(<ICoordsChangeEvent>{
      newVal: [value,this.coords_y],
      prevVal:[this.coords_x,this.coords_y],
    });
    this._coords_x = value;
  }
  private _coords_x: number;
  private _coords_y: number;
  public onChangeEvent:Observable<ICoordsChangeEvent>;
  private _onChangeEventEmitter: Subject<ICoordsChangeEvent>;

  constructor(x: number, y: number) {
    this._coords_x = x;
    this._coords_y = y;
    this._onChangeEventEmitter = new Subject<ICoordsChangeEvent>();
    this.onChangeEvent = this._onChangeEventEmitter.asObservable();
  }
}

export interface IUser {
  coords: BaseCoords;
  name: string;
  image:string;
  rsprInfo:IRsprInfo;
  selected:boolean;
}

export class User implements IUser{
  get lifetime(): number {
    return this._lifetime;
  }
  get lifetimeAsSeconds(): number {
    return (this._lifetime/1000)-((this._lifetime%1000)/1000);
  }
  private _coords: BaseCoords;
  private _lifetime:number;
  get coords(): BaseCoords {
    return this._coords;
  }

  get name(): string {
    return this._name;
  }

  get currentState(): Direction {
    return this._currentState;
  }

  get placemark(): IPlacemark {
    return this._placemark;
  }

  get probablyMatrix(): ProbablyMatrix {
    return this._probablyMatrix;
  }

  get image(): string {
    return this._image;
  }

  set coords(value: BaseCoords) {
    this._coords = value;
  }
  set rsprInfo(value: IRsprInfo)
  {
    this._onRsprInfoChangedEmitter.next({rsprInfo:value});
  }
  set currentState(value: Direction) {
    let e = <IUserChangeEvent>{
      newVal: value,
      prevVal:this.currentState,
    };
    this._currentState = value;
    this._onChangeEventEmitter.next(e);
  }

  private readonly _name: string;
  private readonly _placemark: IPlacemark;
  private readonly _probablyMatrix: ProbablyMatrix;
  private readonly _image:string;
  private _currentState: Direction;
  private _onChangeEventEmitter: Subject<IUserChangeEvent>;
  private readonly _lifecycleTimerID;
  private  _onRsprInfoChangedEmitter:Subject<IUserRsprChangedEvent>;
  public thoughts: string;
  public directionDuration:number = 2000;

  public onChangeEvent:Observable<IUserChangeEvent>;
  public onRsprInfoChangeEvent:Observable<IUserRsprChangedEvent>;
  constructor(coords: BaseCoords, name: string, currentState: Direction, placemark: IPlacemark, probablyMatrix: ProbablyMatrix, image: string) {
    this._coords = coords;
    this._name = name;
    this._currentState = currentState;
    this._placemark = placemark;
    this._probablyMatrix = probablyMatrix;
    this._image = image;
    this._onChangeEventEmitter = new Subject<IUserChangeEvent>();
    this._onRsprInfoChangedEmitter = new Subject<IUserRsprChangedEvent>();
    this.onChangeEvent = this._onChangeEventEmitter.asObservable();
    this.onRsprInfoChangeEvent = this._onRsprInfoChangedEmitter.asObservable();
    this._lifetime = 0;
    this._lifecycleTimerID = setInterval(()=>{
      this._lifetime++;
    },1);

  }
  destroy()
  {
    clearInterval(this._lifecycleTimerID);
  }

  selected: boolean;
}
export interface IUserChangeEvent {
  newVal:Direction,
  prevVal:Direction,
}
export interface IUserRsprChangedEvent {
  rsprInfo:IRsprInfo;
}
export interface ICoordsChangeEvent {
  newVal:number[],
  prevVal:number[],
}
