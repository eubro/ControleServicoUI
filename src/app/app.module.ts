import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicoComponent } from './servico/servico.component';
import { NovoServicoComponent } from './novo-servico/novo-servico.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import { ServicoConcluidoComponent } from './servico-concluido/servico-concluido.component';
import { RegistroComponent } from './registro/registro.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {  sideBarComponent } from './sidebar/sideBar.component';
import { ResetComponent } from './reset/reset.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';








@NgModule({
  declarations: [	
    AppComponent,  
    ServicoComponent,
    NovoServicoComponent,
    NavComponent,
    ServicoConcluidoComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    ResetComponent,
    sideBarComponent,
    RelatoriosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgToastModule,
    
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }