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

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, LoginComponent],
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
