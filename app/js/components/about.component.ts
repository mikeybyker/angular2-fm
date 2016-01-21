import {Component} from 'angular2/core';

@Component({
    selector: 'about',
    template: `
        <div class="row">
            <div class="small-10 small-offset-1 columns">
                <h2>About</h2>
                <p>
                    A simple <a href="http://www.last.fm/" target="_blank">Last.fm</a> app to search/browse artists and albums. Made with <a href="https://angular.io/" target="_blank">Angular 2</a> (version 2.0.0-beta.1 - things may change).
                    <br>
                    <a href="http://foundation.zurb.com/sites" target="_blank">Foundation 6</a> used for (limited!) styling.
                </p>
                <hr>
                <div class="row">
                    <div class="small-12 medium-6 columns">
                        <h3>Features Used</h3>
                        <ul class="list">
                            <li>Components</li>
                            <li>Template Syntax</li>
                            <li>Routing &amp; Navigation</li>
                            <li>$http service - Reactive programming (RxJs)</li>
                            <li>Forms / User Input</li>
                            <li>Dependency Injection</li>
                            <li>Pipes</li>
                            <li>Attribute directives</li>
                            <li>Structural directives</li>
                        </ul>
                    </div>
                    <div class="small-12 medium-6 columns">
                        <h3>Install</h3>
                        <code>npm install</code>
                        <h3>Run</h3>
                        <code>npm start</code>
                    </div>
                </div>
                <hr>
            </div>
        </div>

        `
})

export class AboutComponent {

}