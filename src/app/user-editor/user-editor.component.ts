import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../models/common";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.less']
})
export class UserEditorComponent implements OnInit {
  @Input() users:User[];
  @Input() stationCount:number;
  @Output() UserSelectedEvent: EventEmitter<User>;
  @Output() AddNewUserEvent: EventEmitter<void>;
  @Output() DeleteUserEvent: EventEmitter<User>;
  @Output() AddNewVBaseStationEvent: EventEmitter<void>;

  selectedUser: User;
  constructor() {
    this.UserSelectedEvent = new EventEmitter<User>();
    this.AddNewUserEvent = new EventEmitter<void>();
    this.AddNewVBaseStationEvent = new EventEmitter<void>();
    this.DeleteUserEvent = new EventEmitter<User>();
  }

  ngOnInit() {
  }
  addUser()
  {
    this.AddNewUserEvent.emit();
  }
  addBaseStation()
  {
    this.AddNewVBaseStationEvent.emit();
  }
  selectUser(user:User):void
  {
    this.selectedUser = user;
    this.UserSelectedEvent.emit(user);
  }
  deleteUser(user:User)
  {
    this.DeleteUserEvent.emit(user);
  }
}
