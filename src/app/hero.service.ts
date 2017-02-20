import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'; // http.get Observable no native toPromise conversion

import { Hero } from './hero';

@Injectable()
export class HeroService {
    
    private heroesUrl = 'api/heroes'; // (!) hardcoded to Angular's web-api 

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise() // execute rxjs promise-converter
            .then(response => response.json().data as Hero[]) // native http resp
            .catch(this.handleError);
    }
    
    getHero(id: number): Promise<Hero> {
        const url =`${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

}
