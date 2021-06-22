import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {Camera} from "@ionic-native/camera/ngx";
import {FileTransfer} from "@ionic-native/file-transfer/ngx";
import {ModalListaComponent} from "./components/modal-lista/modal-lista.component";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "./components/modal/modal.component";
import {ExpandableComponent} from "./components/expandable/expandable.component";
import {ComponentsModule} from "./components/components.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ComponentsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(),
    FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    FileTransfer,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class AppModule {
}
