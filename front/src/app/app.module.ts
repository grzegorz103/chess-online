import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {BoardComponent} from './board/board.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AngularDraggableModule} from 'angular2-draggable';
import {MazeComponent} from './maze/maze/maze.component';
import {MultiplayerComponent} from './maze/multiplayer/multiplayer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PublicChatComponent} from './public-chat/public-chat.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {InterceptorService} from "./interceptor.service";
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MazeComponent,
    MultiplayerComponent,
    PublicChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgbModule,
    AngularDraggableModule,
    MatProgressSpinnerModule,
    PerfectScrollbarModule
  ], providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}