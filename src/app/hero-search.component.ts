




@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
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
            .switchMap(
                term => term // new obsv each time term changes
                ? this.heroSearchService.search(term) // return http search obsv
                : Observable.of<Hero[]>([]) // empty obsv if no search term
            )
            .catch(
                // Handler
                console.log(error);
                return Observable.of<Hero[]>([])
            );
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail',hero.id];
        this.router.navigate(link);
    }

}
