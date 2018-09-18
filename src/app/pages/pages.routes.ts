import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const pagesRoutes: Routes = [

    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'progress', component: ProgressComponent, data : {titulo : 'progress'}},
            {path: 'dashboard', component: DashboardComponent, data : {titulo : 'Dashboard'}},
            {path: 'graficas1', component: Graficas1Component, data : {titulo : 'Grafias'}},
            {path: 'promesas', component: PromesasComponent, data : {titulo : 'promesas'}},
            {path: 'rxjs', component: RxjsComponent, data : {titulo : 'Rxjs'}},
            {path: 'account-settings', component: AccountSettingsComponent, data : {titulo : 'Ajustes del tema'}},
             {path: '', redirectTo: '/dashboard', pathMatch : 'full'}
        ]},
];

export const PAGES_ROUTES  = RouterModule.forChild(pagesRoutes);