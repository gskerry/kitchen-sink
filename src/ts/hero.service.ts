import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'; // http.get Observable no native toPromise conversion

import { Hero } from './hero';

@Injectable()
export class HeroService {
    
    // private endpoint = 'api/heroes'; // (!) hardcoded to Angular's web-api 
    private endpoint = 'api/heroes/flatfile'; // refactor for express API 
    private headers = new Headers({'Content-Type':'application/json'})

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.endpoint)
            .toPromise() // execute rxjs promise-converter
            .then(response => response.json() as Hero[]) // native http resp
            .catch((err) => {this.handleError(err, 'getHeroes')});
    }
    
    getHero(id: number): Promise<Hero> {
        const url =`${this.endpoint}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Hero)
            .catch((err) => {this.handleError(err, 'getHero')});
    }
    
    update(hero: Hero): Promise<Hero> {
        const url =`${this.endpoint}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch((err) => {this.handleError(err, 'updatehero')});
    }

    create(name: string): Promise<Hero>{
        return this.http
            .post(this.endpoint, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch((err) => {this.handleError(err, 'createhero')});
    }
    
    delete(id: number): Promise<void>{
        const url =`${this.endpoint}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch((err) => {this.handleError(err, 'deletehero')});
    }

    private handleError(error: any, sender: string): Promise<void> {
        console.error('An error occured: '+error+' from: '+sender);
        return Promise.reject(error.message || error);
    }

}
