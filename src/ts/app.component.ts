import { Component } from '@angular/core'

@Component({
    selector: 'my-app',
    moduleId: module.id,
    styleUrls: ['../UI/app.component.css'],
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {
    title = 'Tour of Heroes'
}