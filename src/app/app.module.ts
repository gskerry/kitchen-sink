import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule
    ],
    declarations: [ 
        AppComponent,
        HeroDetailComponent,
        HeroesComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
