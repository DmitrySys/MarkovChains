import {Injectable} from '@angular/core';
import {Direction, User} from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  public move(user: User, step: number): Promise<void> {
    return new Promise(resolve => {
      if (Math.round(user.lifetime/10) % (user.directionDuration/10) === 0) {
        this.calculateNextDirection(user);
        console.log(`${Math.round(user.lifetime/10)}:${user.directionDuration/10}:${Direction[user.currentState]}`);
      }
      let x = user.coords.coords_x;
      let y = user.coords.coords_y;
      if (user.currentState >= 4) {
        let d = Math.sqrt(Math.pow(step, 2) / 2);
        switch (user.currentState) {
          case Direction.DR: {
            x += d;
            y -= d;
            break;
          }
          case Direction.UL: {
            x -= d;
            y += d;
            break;
          }
          case Direction.DL: {
            x -= d;
            y -= d;
            break;
          }
          case Direction.UR:
            x += d;
            y += d;
            break;
        }
      } else {
        switch (user.currentState) {
          case Direction.R:
            x += step;
            break;
          case Direction.L:
            x -= step;
            break;
          case Direction.U:
            y += step;
            break;
          case Direction.D:
            y -= step;
            break;
        }
      }
      user.coords.coords_x = x;
      user.coords.coords_y = y;
    });
  }

  private calculateNextDirection(user: User): void {
    let d = <Direction>user.currentState;
    const arr = user.probablyMatrix.getByDirection(d);
    user.currentState = <Direction>this.getNextPoint(arr);
  }

  private getNextPoint(probabilities: number[]) {
    try {
      if (probabilities.reduce((a, b) => a + b, 0) != 100) {
        throw new Error('Incorrect probabilities array');
      }
      let r = Math.floor(Math.random() * Math.floor(100));
      let s = 0;
      let i = 0;
      for (; i < probabilities.length - 1; i++) {
        s += probabilities[i];
        if (r > (s - probabilities[i]) && r < s) {
          break;
        }
      }
      return <Direction>i;
    } catch (e) {
      console.error(e);
    }
  }
}
