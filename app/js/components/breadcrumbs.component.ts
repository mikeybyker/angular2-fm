import {Component, Input} from 'angular2/core';

@Component({
    selector: 'breadcrumbs',
    template: `
        <div class="row">
            <div class="columns">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <!-- docs say no first variable... -->
                        <li *ngFor="#link of links; #last = last; #index  = index " [class.disabled]='last'>
                            <span [ngSwitch]="last && index !== 0">
                                <span *ngSwitchWhen="true">{{link.title}}</span>
                                <a [href]="link.url" *ngSwitchDefault >{{link.title}}</a>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>  
        </div>  
        `
})

export class BreadcrumbsComponent { 
    @Input() links: Array<any> = [];

    ngOnInit(){
        this.links.unshift({ title: 'HOME', url: '' })
    }
}