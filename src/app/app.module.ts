import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RootComponent} from './root/root.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddPointDialogComponent} from './add-point-dialog/add-point-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {InfoCardComponent} from './info-card/info-card.component';
import {MatListModule} from "@angular/material/list";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatBadgeModule} from "@angular/material/badge";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import { MatrixViewComponent } from './matrix-view/matrix-view.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { GraphViewComponent } from './graph-view/graph-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    AddPointDialogComponent,
    InfoCardComponent,
    MatrixViewComponent,
    UserEditorComponent,
    GraphViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    DragDropModule,
    MatBadgeModule,
    ScrollingModule,
    MatTabsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
