import {IProbabilityMatrixBuilder, ProbabilityMatrixBuilder, ProbablyMatrix} from "./probabilityMatrix";
import {Direction, User, UserCoords} from "../models/common";
import {Names} from "../assets/names";
import {Images} from "../assets/images";
import {Coords, NodeCoords} from "../graph/graph";
import {MapLoaderService} from "../services/map-loader.service";

export class UserBuilder {
  private readonly spawnPoints: Coords[];
  private matrixBuilder: IProbabilityMatrixBuilder<User, ProbablyMatrix>;
  private mapService: MapLoaderService;

  constructor(mapService: MapLoaderService) {
    this.matrixBuilder = new ProbabilityMatrixBuilder();
    this.spawnPoints = NodeCoords;
    this.mapService = mapService;
  }

  public createUser(): User {
    const matrix = this.matrixBuilder.build();
    const points = this.spawnPoints;
    const spawnPoint = points[Math.floor(Math.random() * points.length)];
    const placemark = this.mapService.addPlacemark([spawnPoint.x, spawnPoint.y]);
    const coords = new UserCoords(spawnPoint.x,spawnPoint.y);
    let u =  new User(coords,Names.getRandomName(),Direction.U, placemark,matrix,Images.getRandomImage());
    u.thoughts = Names.getThought();
    return u;
  }
}
