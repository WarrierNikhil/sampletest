import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './ui-component/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarComponent } from './ui-component/sidebar/sidebar.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AuthinterceptorService } from './interceptor/authinterceptor.service';
import { MenubarComponent } from './ui-component/menubar/menubar.component';
import { NavdrawerService } from './shared/navdrawer.service';
import { NavmenuListComponent } from './ui-component/navmenu-list/navmenu-list.component';
import { FileuploaderComponent } from './ui-component/fileuploader/fileuploader.component';
import { ErrorInterceptorService } from './interceptor/error-interceptor.service';
import { ErrorComponent } from './error/error.component';
import { ExpensesModule } from './expenses/expenses/expenses.module';
import { AuthenticationModule } from './authentication/authentication.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileComponent,
    MenubarComponent,
    NavmenuListComponent,
    FileuploaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ExpensesModule,
    AuthenticationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    NavdrawerService
  ],

  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
