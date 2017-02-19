import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero'; 
import { HeroService } from './hero.service'

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    styleUrls: ['./heroes.component.css'],
    templateUrl: './heroes.component.html'
})

export class HeroesComponent implements OnInit { 
    heroes: Hero[];
    selectedHero: Hero;
    
    constructor(
        private router: Router,
        private heroService: HeroService
    ) {}
    
    onSelect(hero: Hero): void {
        this.selectedHero = hero; 
    }
    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes)
    }
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
    ngOnInit() : void {
        this.getHeroes();
    }

}
