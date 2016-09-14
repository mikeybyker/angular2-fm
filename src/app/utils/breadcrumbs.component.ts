import { Component, Input } from '@angular/core';

@Component({
    selector: 'breadcrumbs',
    template: `
        <div class="row">
            <div class="columns">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li *ngFor="let link of links; let first = first; let last = last;" [class.disabled]='last'>
                            <span [ngSwitch]="last && !first">
                                <span *ngSwitchCase="true">{{link.title}}</span>
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
        this.links.unshift({ title: 'HOME', url: '' });
    }
}
