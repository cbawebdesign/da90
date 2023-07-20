import { Component, OnDestroy, ViewEncapsulation, ElementRef, KeyValueDiffers, Renderer2 } from '@angular/core';
import { filter, map, startWith, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { trigger, animate, style, transition } from '@angular/animations';
import { Router, ResolveStart, NavigationEnd } from '@angular/router';
import { BackgroundObservable } from 'app/utils/background';
import { DarkModeObserver } from 'app/utils/platform';
import { Observable, Subscription } from 'rxjs';
import { NgStyle } from '@angular/common';
import { environment } from 'env/environment';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [
      transition(':leave', [
        animate('200ms ease-out', 
          style({ opacity: 0 })
        )] 
      )
    ])
  ],
  host: {
    'class': 'mat-typography mat-app-background', 
    '[class.dark-mode]': 'darkMode'
  }
})
export class AppComponent extends NgStyle implements OnDestroy { 
  
  readonly loading$: Observable<boolean>;
  private sub: Subscription;
  
  public darkMode: boolean;
  cookieMessage: string;
  cookieDismiss: any;
  cookieLinkText: any;

  constructor(background$: BackgroundObservable, private darkMode$: DarkModeObserver, el: ElementRef, diffs: KeyValueDiffers, renderer: Renderer2, router: Router) {

    // Builds the NgStyle directive
    super(el, diffs, renderer);

    // Applies the styles coming from BackgroundObservable
    this.sub = background$.subscribe( styles => {
      this.ngStyle = styles;
    });

    // Detects the dark mode, when enabled
    this.sub.add( darkMode$.subscribe( dark => this.darkMode = dark ) );

    // Uses router events to display the loading spinner
    this.loading$ = router.events.pipe( 
      // Filters the meaningful events only
      filter( e => e instanceof ResolveStart || e instanceof NavigationEnd ),
      // Maps the event to the boolean value
      map( e => e instanceof ResolveStart ),
      // Makes sure to start properly
      startWith(true),
      // Filters unchanged values
      distinctUntilChanged(),
      // Completes when done loading
      takeWhile( value => value, true)
    );
  }
  ngOnInit() {
  let cc = window as any;
  cc.cookieconsent.initialise({
    palette: {
      popup: {
        background: "#164969"
      },
      button: {
        background: "#ffe000",
        text: "#164969"
      }
    },
    theme: "classic",
    content: {
      message: "We use our own and third-party cookies to personalize content and to analyze web traffic.",
      dismiss: "Accept Cookies",
      link: this.cookieLinkText,
      // href: environment.Frontend + "/dataprivacy" 
    }
  });
}
  // Disposes of the subscription
  ngOnDestroy() { this.sub.unsubscribe(); }
}
