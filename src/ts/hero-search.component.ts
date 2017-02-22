import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import 'rxjs/add/observable/of'; // Observable class extensions

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';


@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: '../UI/hero-search.component.html',
    styleUrls: ['../UI/hero-search.component.css'],
    providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
    
    heroes: Observable<Hero[]>;

    private searchTerms = new Subject<string>();

    constructor (
        private heroSearchService: HeroSearchService,
        private router: Router
    ) {}

    search(term: string): void {
        this.searchTerms.next(term)
    } // rxjs subject... push term to obsv stream

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300) // pause each keystroke
            .distinctUntilChanged() // ignore if same as previous
            .switchMap( // preserves req order - but returns only most recent active req
                term => term // new obsv each time term changes
                ? this.heroSearchService.search(term) // return http search obsv
                : Observable.of<Hero[]>([]) // empty obsv if no search term
                // N.B. not actually aborting prior pending http calls. Just discarding results.
                // TODO: managing http traffic.
            )
            .catch (error => {
                // Handler
                console.log(error);
                return Observable.of<Hero[]>([])
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail',hero.id];
        this.router.navigate(link);
    }

}
