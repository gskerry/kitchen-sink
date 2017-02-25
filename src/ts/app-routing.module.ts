import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent }  from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { testApi } from './testapi';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/test',
        pathMatch: 'full'
    }, 
    {
        path: 'test',
        component: testApi
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
