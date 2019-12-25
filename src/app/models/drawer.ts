import {Direction} from "./common";

export class Track {
  x:number;
  y:number;
  mtx:number;
  mty:number;

  constructor(x: number, y: number, mtx: number, mty: number) {
    this.x = x;
    this.y = y;
    this.mtx = mtx;
    this.mty = mty;
  }
}
export class Point {
  x:number;
  y:number;
  direction:string;

  constructor(x: number, y: number, direction: string) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}
