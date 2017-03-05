import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {

    // private endpoint = 'app/heroes'; // web-api
    private endpoint = 'api/heroes/flatfile'; // express endpoint. 

    constructor(private http: Http) {}

    search(term: string): Observable<Hero[]>{
        return this.http
            .get(`${this.endpoint}?name=${term}`)
            // .map(response => response.json().data as Hero[]);
            .map(response => response.json() as Hero[]);
    }
}
