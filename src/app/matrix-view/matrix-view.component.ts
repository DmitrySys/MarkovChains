import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Direction, IUser, IUserChangeEvent, User} from "../models/common";
import {IMatrixViewModel} from "./models";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-matrix-view',
  templateUrl: './matrix-view.component.html',
  styleUrls: ['./matrix-view.component.less']
})
export class MatrixViewComponent implements OnInit, OnChanges,OnDestroy {
  @Input() user:User;
  constructor() { }
  private sub:Subscription;
  ngOnInit() {
  }
  matrix:IMatrixViewModel[];
  buildMatrix()
  {
    this.matrix = [];
    if(this.user)
    {
      let uMatrix = this.user.probablyMatrix.matrix;
      for (let row in uMatrix)
      {
        let item = <IMatrixViewModel>{direction:row,value:uMatrix[row],isCurrentState:false};
        this.matrix.push(item);
      }
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    let user = changes['user'];
    if(user && user.currentValue !== user.previousValue)
    {
      this.buildMatrix();
      if(this.sub)
      {
        this.sub.unsubscribe();
      }
      this.sub = this.user.onChangeEvent.subscribe((e:IUserChangeEvent)=>{
        let cur = this.matrix.find((item) => item.isCurrentState);
        cur && (cur.isCurrentState = false);
        this.matrix[e.newVal].isCurrentState = true;
      });
    }
  }
  isCurrentState(row:IMatrixViewModel)
  {
    return row.isCurrentState ? 'cur-state':'';

  }
  ngOnDestroy(): void {
    if(this.sub)
    {
      this.sub.unsubscribe();
    }
  }

}
