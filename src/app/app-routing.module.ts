import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoComponent } from './servico/servico.component';
import { NovoServicoComponent } from './novo-servico/novo-servico.component';
import { ServicoConcluidoComponent } from './servico-concluido/servico-concluido.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './guards/auth.guard';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { ResetComponent } from './reset/reset.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'sidebar',
    component:BarraLateralComponent ,
    canActivate: [AuthGuard],    
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'servicos', component: ServicoComponent, canActivate: [AuthGuard] },
      { path: 'novo-servico', component: NovoServicoComponent, canActivate: [AuthGuard] },
      { path: 'concluidos', component: ServicoConcluidoComponent, canActivate: [AuthGuard] },
      { path: 'relatorio', component: RelatoriosComponent, canActivate: [AuthGuard] }
    ],
  },
  { path: 'nav', component: NavComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reset', component: ResetComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
