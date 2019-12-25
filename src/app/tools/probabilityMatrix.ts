import {Direction, IUser, User} from "../models/common";

export class ProbablyMatrix implements IProbabilityMatrix<User>{
  private readonly matrix: Array<number[]>;

  constructor(matrix: Array<number[]>) {
    this.matrix = matrix;
  }

  public getByDirection(direction: Direction): number[] {
    switch (direction) {
      case Direction.U:
        return this.U;
      case Direction.UR:
        return this.UR;
      case Direction.UL:
        return this.UL;
      case Direction.D:
        return this.D;
      case Direction.DL:
        return this.DL;
      case Direction.DR:
        return this.DR;
      case Direction.L:
        return this.L;
      case Direction.R:
        return this.R;
    }
  }

  get U(): number[] {
    return this.matrix[Direction[Direction.U]];
  }

  get R(): number[] {
    return this.matrix[Direction[Direction.R]];
  }

  get D(): number[] {
    return this.matrix[Direction[Direction.D]];
  }

  get L(): number[] {
    return this.matrix[Direction[Direction.L]];
  }

  get UR(): number[] {
    return this.matrix[Direction[Direction.UR]];
  }

  get DR(): number[] {
    return this.matrix[Direction[Direction.DR]];
  }

  get DL(): number[] {
    return this.matrix[Direction[Direction.DL]];
  }

  get UL(): number[] {
    return this.matrix[Direction[Direction.UL]];
  }
}
export interface IProbabilityMatrix<T extends IUser> {
  getByDirection(direction: Direction):number[];
}
export interface IProbabilityMatrixBuilder<T extends IUser,S extends IProbabilityMatrix<T>> {
  build():ProbablyMatrix;
}
export class ProbabilityMatrixBuilder implements IProbabilityMatrixBuilder<User, ProbablyMatrix>{
  build(): ProbablyMatrix {
    let map = new Array<number[]>();
    let directions = Object.values(Direction).slice(0,Object.values(Direction).length/2);
    for (let i = 0; i < directions.length; i++) {
      let arr = [];
      let residue = 101;
      for (let j = 0; j <directions.length; j++) {
        let probability = Math.floor(Math.random() * Math.floor(residue));
        residue -=probability;
        if(residue<0)
        {
          probability = 100-arr.reduce((a,b)=>a+b,0);
          arr.push(probability);
          break;
        }
        arr.push(probability);
      }
      if(arr.reduce((a,b)=>a+b,0)<100)
      {
        arr[arr.length-1]+=100-arr.reduce((a,b)=>a+b,0);
      }
      map[directions[i]] = arr;
    }
    return new ProbablyMatrix(map);
  }

}
