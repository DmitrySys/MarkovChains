export class Coords {
  id: number;
  x: number;
  y: number;

  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}
export const NodeCoords: Coords[] = [
  new Coords(1, 55.042142774374450, 82.91714481912120),   //Red.Avenue
  new Coords(1, 55.030070929952400, 82.92116071556617),   //Pl.Lenina
  new Coords(1, 55.016780120933525, 82.94470085824895),   //GPSTB
  new Coords(1, 55.042427977203360, 82.92051123742331),   //Siberian
  new Coords(1, 55.043593283202625, 82.93368560311930),   //Mr.Pokrishkina
  new Coords(1, 55.043766568284130, 82.95154125392428),   //Birch Grove
  new Coords(1, 55.0288141255574500, 82.937891836507380),   //Aura
];

