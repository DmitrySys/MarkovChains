import {ProbablyMatrix} from "../tools/probabilityMatrix";
import {IPlacemark} from "./yandex-api";
import {Observable, Subject} from "rxjs";

export enum Direction {
  U, R, D, L, UR, DR, DL, UL
}
export class UserCoords {
  coords_x: number;
  coords_y: number;

  constructor(x: number, y: number) {
    this.coords_x = x;
    this.coords_y = y;
  }
}

export interface IUser {
  coords: UserCoords;
  name: string;
  image:string;
}

export class User implements IUser{
  private _coords: UserCoords;
  get coords(): UserCoords {
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

  set coords(value: UserCoords) {
    let e = <IUserChangeEvent>{
      newVal: value,
      prevVal:this.coords,
    };
    this._coords = value;
    this._onChangeEventEmitter.next(e);
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
  public thoughts: string;

  public onChangeEvent:Observable<IUserChangeEvent>;
  constructor(coords: UserCoords, name: string, currentState: Direction, placemark: IPlacemark, probablyMatrix: ProbablyMatrix, image: string) {
    this._coords = coords;
    this._name = name;
    this._currentState = currentState;
    this._placemark = placemark;
    this._probablyMatrix = probablyMatrix;
    this._image = image;
    this._onChangeEventEmitter = new Subject<IUserChangeEvent>();
    this.onChangeEvent = this._onChangeEventEmitter.asObservable();
  }
}
export interface IUserChangeEvent {
  newVal:UserCoords|Direction,
  prevVal:UserCoords|Direction,
}
