import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddStationDialog, RootComponent} from './root/root.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddPointDialogComponent} from './add-point-dialog/add-point-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatBadgeModule} from "@angular/material/badge";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import { MatrixViewComponent } from './matrix-view/matrix-view.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { RsprInfoComponent } from './rspr-info/rspr-info.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    AddPointDialogComponent,
    MatrixViewComponent,
    UserEditorComponent,
    GraphViewComponent,
    RsprInfoComponent,
    AddStationDialog
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
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddStationDialog]
})
export class AppModule {
}
