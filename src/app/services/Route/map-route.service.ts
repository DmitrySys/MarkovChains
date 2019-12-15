import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MapRouteService {
  map$: BehaviorSubject<any>;

  constructor() {
    this.map$ = new BehaviorSubject<any>(null);
  }


}
