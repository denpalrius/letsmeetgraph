import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';
import { GraphService } from './services/graph.service';
import { ConfigService } from './services/config.service';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { BaseService } from './services/base.service';
import { HomeComponent } from './components/home/home.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { EventsComponent } from './components/events/events.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, LoginComponent, HomeComponent, MeetingsComponent, EventsComponent, TopBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule.forRoot(),
  ],
  providers: [BaseService, ConfigService, AuthService, GraphService],
  bootstrap: [AppComponent],
})
export class AppModule {}
