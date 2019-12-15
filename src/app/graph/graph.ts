export const graph: Node[] = [
];

export class Node {
  coordsID: number;
  name: string;
  id: number;
  relatedToNodes: number[];
  constructor(id:number,name: string,coordsID: number,relatedToNodes: number[]) {
    this.id = id;
    this.name = name;
    this.coordsID = coordsID;
    this.relatedToNodes = relatedToNodes;
  }
}

export class Coords {
  id:number;
  x:number;
  y:number;
  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

export const NodeCoords: Coords[] = [
  new Coords(1, 55.059484144794020, 82.91256437331396),   //Zaelchovskaya
  new Coords(1, 55.050189155671980, 82.91494492777507),   //Gagarinskaya
  new Coords(1, 55.042142774374450, 82.91714481912120),   //Red.Avenue
  new Coords(1, 55.030070929952400, 82.92116071556617),   //Pl.Lenina
  new Coords(1, 55.016780120933525, 82.94470085824895),   //GPSTB
  new Coords(1, 55.008609617514670, 82.93625907059374),   //River station
  new Coords(1, 54.989105237751940, 82.90637586530317),   //Student's
  new Coords(1, 55.042427977203360, 82.92051123742331),   //Siberian
  new Coords(1, 55.043593283202625, 82.93368560311930),   //Mr.Pokrishkina
  new Coords(1, 55.043766568284130, 82.95154125392428),   //Birch Grove
  new Coords(1, 55.037335488562740, 82.97743632721350),   //Golden cornfield
];
export function LineLength(a:number[],b:number[]):number{
  return Math.abs(Math.sqrt(Math.pow((a[0]-b[0]),2)+Math.pow((a[1]-b[1]),2)))*100000*0.70;
}
