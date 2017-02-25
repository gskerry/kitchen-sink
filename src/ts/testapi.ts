import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http
import 'rxjs/add/operator/toPromise'; // http.get Observable no native toPromise conversion
import { Hero } from './hero';

@Component({
    moduleId: module.id,
    selector: 'my-testapi',
    template: '<p>hello api.</p>',
})

export class testApi implements OnInit { 
    
    heroes: Hero[] = [];

    private myheroesUrl = 'api/myheroes'; // refactor for express API 

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> { 
        return this.http.get(this.myheroesUrl) 
            .toPromise() // execute rxjs promise-converter
            .then(response => console.log(response.json().data))
            // .then(response => response.json().data as Hero[]) // native http resp
            .catch(this.handleError);
    }

    ngOnInit(): void {
        this.getHeroes()
            .then(function(heroes){ 
                console.log(heroes);
                // this.heroes = heroes.slice(1,5)
            });
    }

}
