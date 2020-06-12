import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MapLoaderService} from "../services/map-loader.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Engine} from "../engine/engine";
import {User} from "../models/common";
import {IClickEvent, IMap} from "../models/yandex-api";
import {UserBuilder} from "../tools/user-builder";
import {UserService} from "../services/user.service";
import {filter} from "rxjs/operators";
import {RsprService} from "../services/rspr-service.service";
import * as $ from 'jquery';
import {BaseStation} from "../models/baseStation";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
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
  addStationMode:boolean = false;

  constructor(private mapService: MapLoaderService,public stationsService: RsprService,private userService:UserService,public dialog: MatDialog) {
    this.userBuilder = new UserBuilder(mapService);
    this.engine = new Engine(userService,stationsService,{stepTime: 50, distance: 0.00001});
    this.users = this.engine.users;
    this.selectedUser = new BehaviorSubject<User>(null);
  }
  addBaseStation()
  {
    this.openDialog();
  }
  addUser(e: any): void {
    const user = this.userBuilder.createUser();
    user.placemark.events.add('click', (e) => this.onClickedAtPlacemark(e));
    this.engine.addUser(user);
    this.engine.run();
  }
  followSub:Subscription;
  selectUser(user:User)
  {
    if(this.followSub)
    {
      this.followSub.unsubscribe();
    }
    const prev = this.selectedUser.value;
    if(prev)
    {
      prev.selected = false;
    }
    user.selected = true;
    this.selectedUser.next(user);
    let u = this.engine.getUserByPlacemarkGuid(user.placemark.guid);
    if (u) {
      this.map.panTo([this.map.getCenter(),[u.placemark.geometry._coordinates[0],u.placemark.geometry._coordinates[1]]],{delay:1}).then(()=>{
        this.map.setCenter(this.map.getCenter(),this.map.getZoom());
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

        this.stationsService.addStation([55.02364180360142, 82.92828024533603],"Октябрьская БС");
        this.stationsService.addStation([55.0368015905741, 82.9270670972084],"Центральная БС");
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedUser.unsubscribe();
    this.engine.destroy();
    this.followSub.unsubscribe();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddStationDialog, {
      width: '250px',
      data:{name:''}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.canceled){
        this.addStationMode = true;
        let station:BaseStation;
        const onClickHandler = (e) => {
          this.addStationMode = false;
          $("#map-container").off('mousemove');
          station.mapObj.events.remove('click',onClickHandler);
        };
        $("#map-container").on("mousemove", (e) => {
          const coords = this.mapService.convertBrowserPxToMapCoords([e.pageX,e.pageY]);
          if (!station)
          {
            station = this.stationsService.addStation(coords,result.name);
            station.mapObj.events.add('click',onClickHandler);
          } else {
            this.stationsService.moveStation(station, coords);
          }
        });
      }
    });
  }
}
@Component({
  selector: 'add-station-dialog',
  templateUrl: 'addStationDialog.html',
})
export class AddStationDialog {
  name:string = '';
  constructor(
    public dialogRef: MatDialogRef<AddStationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  add():void{
    const name = $("#name").val();
    this.data.name = name;
    this.dialogRef.close(this.data);
  }
  onNoClick(): void {
    this.data.canceled = true;
    this.dialogRef.close(this.data);
  }

}
