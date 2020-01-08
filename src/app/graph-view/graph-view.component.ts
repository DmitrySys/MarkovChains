import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IUserChangeEvent, User} from "../models/common";
import {Drawer} from "../drawer/drawer";
import {Subscription} from "rxjs";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.less']
})
export class GraphViewComponent implements OnInit,OnDestroy {
  @Input() user:User;
  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private drawer: Drawer;
  private ctx: CanvasRenderingContext2D;
  private _sub: Subscription;
  private _animationTimer;
  w:number;
  h:number;
  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.w = environment.graphSize.w;
    this.h = environment.graphSize.h;
    this.draw();
  }
  draw() {
    this.drawer = new Drawer(this.w, this.h, 35, this.user, this.ctx);
    this.drawer.render();
    this._animationTimer = setInterval(()=>this.drawer.render(),41);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
    clearInterval(this._animationTimer);
  }

}
