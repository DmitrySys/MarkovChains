import {Direction, User} from "../models/common";
import {Point, Track} from "../models/drawer";
import {Images} from "../assets/images";
import {isEmpty} from "rxjs/operators";

export class Drawer {
  private imgs: Map<string, any>;
  private activeImgs: Map<string, any>;
  private points:Point[];
  w: number;
  h: number;
  size: number;
  user: User;
  ctx: CanvasRenderingContext2D;

  private initImgs() {
    this.imgs = new Map<string, object>();
    this.activeImgs = new Map<string, object>();
    for (let direction in Object.values(Direction).slice(0,Object.values(Direction).length/2)) {

      let img = new Image(this.size,this.size);
      img.src =  Images.getDrawerImages(direction, false).asBase64;
      if(img.src&&img.src !== '')
      {
        this.imgs.set(Direction[direction], img);
      }

      let activeImg = new Image(this.size,this.size);
      activeImg.src = Images.getDrawerImages(direction,true).asBase64;
      if(activeImg.src&&activeImg.src !== '') {
        this.activeImgs.set(Direction[direction], activeImg);
      }
    }
  }


  constructor(w: number, h: number, size: number, user: User, ctx: CanvasRenderingContext2D) {
    this.w = w;
    this.h = h;
    this.size = size;
    this.user = user;
    this.ctx = ctx;
    this.initImgs();
    this.points = MarkovCanvasImage.BuildPoints(this.w,this.h,this.w/2,this.h/2);
  }
  isRendering = false;
  isComplete = () => this.taskCounter === 0;
  taskCounter:number = 0;
  render() {
    if(this.isRendering)
    {
      return
    } else {
      this.isRendering = true;
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    let active = Direction[this.user.currentState];
    this.points.forEach((item:Point) => {
      let img = active === item.direction ? this.activeImgs.get(item.direction) : this.imgs.get(item.direction);
      this.ctx.drawImage(img,item.x,item.y,this.size,this.size);
    });
    this.isRendering = false;
  }
}

class MarkovCanvasImage {
  static BuildPoints(w: number, h: number, cx: number, cy: number): Point[] {
    let p1 = new Point(cx, cy - (h / 2), 'U');
    let p2 = new Point(cx + cx * (Math.sqrt(2) / 2), cy - cy * (Math.sqrt(2) / 2), 'UR');
    let p3 = new Point(cx + (w / 2), cy, 'R');
    let p4 = new Point(cx + cx * (Math.sqrt(2) / 2), cy + cy * (Math.sqrt(2) / 2), 'DR');
    let p5 = new Point(cx, cy + (h / 2), 'D');
    let p6 = new Point(cx - cx * (Math.sqrt(2) / 2), cy + cy * (Math.sqrt(2) / 2), 'DL');
    let p7 = new Point(cx - (w / 2), cy, 'L');
    let p8 = new Point(cx - cx * (Math.sqrt(2) / 2), cy - cy * (Math.sqrt(2) / 2),'UL');
    return [p1, p2, p3, p4, p5, p6, p7, p8];
  }

  static BuildTrucks(user: User, points: Point[], size: number): Track[] {
    let arr = [];
    let matrixCounter = 0;
    user.probablyMatrix.U.forEach((item: number, index: number) => {
      let t = new Track(Point[index].x + size / 2, Point[index].y + size / 2, points[matrixCounter].x + size / 2, points[matrixCounter].y + size / 2);
      arr.push(t);
    });
    matrixCounter++;
    user.probablyMatrix.U.forEach((item: number, index: number) => {
      let t = new Track(Point[index].x + size / 2, Point[index].y + size / 2, points[matrixCounter].x + size / 2, points[matrixCounter].y + size / 2);
      arr.push(t);
    });
    matrixCounter++;
    user.probablyMatrix.U.forEach((item: number, index: number) => {
      let t = new Track(Point[index].x + size / 2, Point[index].y + size / 2, points[matrixCounter].x + size / 2, points[matrixCounter].y + size / 2);
      arr.push(t);
    });
    matrixCounter++;
    user.probablyMatrix.U.forEach((item: number, index: number) => {
      let t = new Track(Point[index].x + size / 2, Point[index].y + size / 2, points[matrixCounter].x + size / 2, points[matrixCounter].y + size / 2);
      arr.push(t);
    });
    matrixCounter++;
    user.probablyMatrix.U.forEach((item: number, index: number) => {
      let t = new Track(Point[index].x + size / 2, Point[index].y + size / 2, points[matrixCounter].x + size / 2, points[matrixCounter].y + size / 2);
      arr.push(t);
    });
    matrixCounter++;
    user.probablyMatrix.U.forEach((item: number, index: number) => {
      let t = new Track(Point[index].x + size / 2, Point[index].y + size / 2, points[matrixCounter].x + size / 2, points[matrixCounter].y + size / 2);
      arr.push(t);
    });
    matrixCounter++;
    user.probablyMatrix.U.forEach((item: number, index: number) => {
      let t = new Track(Point[index].x + size / 2, Point[index].y + size / 2, points[matrixCounter].x + size / 2, points[matrixCounter].y + size / 2);
      arr.push(t);
    });
    matrixCounter++;
    user.probablyMatrix.U.forEach((item: number, index: number) => {
      let t = new Track(Point[index].x + size / 2, Point[index].y + size / 2, points[matrixCounter].x + size / 2, points[matrixCounter].y + size / 2);
      arr.push(t);
    });
    return arr;

  }
}
