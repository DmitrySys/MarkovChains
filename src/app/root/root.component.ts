import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapLoaderService} from "../services/map-loader.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Engine} from "../engine/engine";
import {User} from "../models/common";
import {IClickEvent, IMap} from "../models/yandex-api";
import {UserBuilder} from "../tools/user-builder";
import {UserService} from "../services/user.service";
import {filter} from "rxjs/operators";

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
  followSub:Subscription;
  selectUser(user)
  {
    if(this.followSub)
    {
      this.followSub.unsubscribe();
    }
    let u = this.engine.getUserByPlacemarkGuid(user.placemark.guid);
    if (u) {
      this.map.panTo([this.map.getCenter(),[u.placemark.geometry._coordinates[0],u.placemark.geometry._coordinates[1]]],{delay:1}).then(()=>{
        this.map.setCenter(this.map.getCenter(),17);
        this.followSub = u.coords.onChangeEvent.pipe(filter((val, index) => index%100===0)).subscribe((e)=>{
          this.map.panTo([this.map.getCenter(),[e.newVal[0],e.newVal[1]]],{delay:1});
        });
        this.map.behaviors.disable('scrollZoom');
        this.map.events.add('click',()=>{
          if(this.followSub)
          {
            this.followSub.unsubscribe();
            this.map.events.remove('click');
            this.map.behaviors.enable('scrollZoom');
          }
        });
      });
    }
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
    this.followSub.unsubscribe();
  }
}
