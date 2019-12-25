import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapLoaderService} from "../services/map-loader.service";
import {BehaviorSubject} from "rxjs";
import {Engine} from "../engine/engine";
import {User} from "../models/common";
import {IClickEvent, IMap} from "../models/yandex-api";
import {UserBuilder} from "../tools/user-builder";
import {UserService} from "../services/user.service";

@Component({
  selector: 'mc-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less']
})
export class RootComponent implements OnInit,OnDestroy {
  map:IMap;
  engine: Engine;
  private userBuilder:UserBuilder;
  selectedUser: BehaviorSubject<User>;
  users:Array<User>;

  constructor(private mapService: MapLoaderService,private userService:UserService) {
    this.userBuilder = new UserBuilder(mapService);
    this.engine = new Engine(userService,{stepTime: 50, distance: 0.00001});
    this.users = this.engine.users;
    this.selectedUser = new BehaviorSubject<User>(null);
  }

  addUser(e: any): void {
    const user = this.userBuilder.createUser();
    user.placemark.events.add('click', (e) => this.onClickedAtPlacemark(e));
    this.engine.addUser(user);
    this.engine.run();
  }

  onClickedAtPlacemark(e: IClickEvent) {
    if (e && e.originalEvent && e.originalEvent.target && e.originalEvent.target.guid) {
      let user = this.engine.getUserByPlacemarkGuid(e.originalEvent.target.guid);
      if (user) {
        this.selectedUser.next(user);
      }
    }
  }

  remove(user:User)
  {
    this.map.geoObjects.remove(user.placemark);
    this.engine.removeUser(user);
    this.closeCard();
  }
  closeCard()
  {
    this.selectedUser.next(null);
  }

  ngOnInit() {
    setTimeout(() => this.loadMap(), 1000);
  }

  loadMap() {
    this.mapService.getMap('map').then(map => {
        this.map = map;
        this.addUser(null);
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedUser.unsubscribe();
    this.engine.destroy();
  }
}
