import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'; // http.get Observable no native toPromise conversion

import { Hero } from './hero';

@Injectable()
export class HeroService {
    
    private heroesUrl = 'api/heroes'; // (!) hardcoded to Angular's web-api 
    private myheroesUrl = 'api/myheroes'; // refactor for express API 
    private headers = new Headers({'Content-Type':'application/json'})

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.myheroesUrl)
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
    
    update(hero: Hero): Promise<Hero> {
        const url =`${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError)
    }

    create(name: string): Promise<Hero>{
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    
    delete(id: number): Promise<void>{
        const url =`${this.heroesUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

}
