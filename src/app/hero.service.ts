import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'; // http.get Observable no native toPromise conversion

import { Hero } from './hero';

@Injectable()
export class HeroService {
    
    private heroesUrl = 'api/heroes';

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise() // execute rxjs promise-converter
            .then(response => response.json().data as Hero[]) // native http resp
    }
    
    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

}
