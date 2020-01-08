import {
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IUserChangeEvent, User} from "../models/common";
import {Drawer} from "../drawer/drawer";
import {IProbabilityMatrix, ProbablyMatrix} from "../tools/probabilityMatrix";

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.less']
})
export class InfoCardComponent implements OnInit, OnChanges,OnDestroy {
  @Input() $user: Observable<User>;
  @Output() onClose:EventEmitter<any>;
  @Output() onRemove:EventEmitter<User>;
  user: User;
  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private drawer: Drawer;
  private sub: Subscription;
  private ctx: CanvasRenderingContext2D;
  private matrix:IProbabilityMatrix<User>;
  constructor() {
    this.onClose = new EventEmitter<any>();
    this.onRemove = new EventEmitter<User>();
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.$user && !this.sub) {
      this.sub = this.$user.subscribe((value: User) => {
        if (value) {
          this.user = value;
          this.matrix = this.user.probablyMatrix;
          setTimeout(() => this.draw(), 100);
        }
      });
    }
  }

  draw() {
    let o = new Image(35, 35);
    o.src = './assets/drawer/U_BLUE.png';
    this.ctx.drawImage(o, 160, 160, 35, 35);
    this.drawer = new Drawer(250, 300, 35, this.user, this.ctx);
    this.drawer.render();
    this.user.onChangeEvent.subscribe((e: IUserChangeEvent) => {
        this.drawer.render();
      }
    );
  }
  close = () => {
    this.onClose.emit();
  };
  remove = () => {
    this.onRemove.emit(this.user);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

