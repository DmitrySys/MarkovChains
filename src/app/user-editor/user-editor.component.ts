import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../models/common";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.less']
})
export class UserEditorComponent implements OnInit {
  @Input() users:User[];
  @Output() UserSelectedEvent: EventEmitter<User>;
  @Output() AddNewUserEvent: EventEmitter<void>;
  @Output() DeleteUserEvent: EventEmitter<User>;

  selectedUser: User;
  constructor() {
    this.UserSelectedEvent = new EventEmitter<User>();
    this.AddNewUserEvent = new EventEmitter<void>();
    this.DeleteUserEvent = new EventEmitter<User>();
  }

  ngOnInit() {
  }
  addUser()
  {
    this.AddNewUserEvent.emit();
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
