import {Subject} from "rxjs";
import {User} from "../models/common";
import {UserService} from "../services/user.service";

interface IEngineOptions {
  stepTime: number;
  distance: number;
}

export class Engine {
  private readonly distance: number;
  private readonly stepTime: number;
  private readonly _users: Array<User>;
  private isWorking: boolean;
  private isPaused:boolean;
  private onChangeEvent: Subject<User>;
  private userService:UserService;

  constructor(userService:UserService, opts?: IEngineOptions) {
    this._users = new Array<User>();
    this.onChangeEvent = new Subject<User>();
    this.userService = userService;
    this.stepTime = opts && opts.stepTime ? opts.stepTime : 33;
    this.distance = opts && opts.distance ? opts.distance : 0.001;
  }

  get users(): Array<User> {
    return this._users;
  }

  get isRun(): boolean {
    return this.isWorking;
  }
  getUserByPlacemarkGuid(guid:string):User
  {
    return this._users.find((user)=>user.placemark && user.placemark.guid === guid);
  }
  public run(): void {
    if (!this.isWorking) {
      this.isWorking = true;
      this.lifecycle();
    }
  }

  public addUser(user:User):void{
    this._users.push(user);
  }

  public removeUser(user:User):void{
    let _index=-1;
    this.users.find((item,index)=>{
      if(item.placemark.guid === user.placemark.guid)
      {
        _index = index;
        return true;
      } else {
        return false;
      }
    });
    if(_index!== -1)
    {
      this.users.splice(_index, 1);
    }
  }

  public togglePause(): void {
    this.onPause();
  }

  public destroy(): void {
    this.onDestroy();
  }

  private onStart(): void {

  }

  private onStep(): void {
    this._users.forEach((item) => {
      this.userService.move(item,this.distance);
    });
  }

  private onRender(): void {
    this._users.forEach((item:User) => {
      const coords = [item.coords.coords_x,item.coords.coords_y];
      item.placemark.geometry.setCoordinates(coords);
    });
  }

  private onPause(): void {
    if (this.isWorking)
      this.isWorking = false;
    this.isPaused = true;
  }

  private onDestroy(): void {
    this.isWorking = false;
    this.isPaused = false;
    this.onChangeEvent.unsubscribe();
  }

  private lifecycle() {
    this.onStart();
    this.loop().finally(() => this.onDestroy());
  }

  private async loop() {
    while (true) {
      await new Promise(resolve => setTimeout(resolve, this.stepTime));
      if (this.isWorking) {
        this.onStep();
        this.onRender();
      } else {
        if (!this.isPaused) {
          break;
        }
      }
    }
  }



}
