import {Component, Input} from '@angular/core';

@Component({
    selector: 'breadcrumbs',
    template: `
        <div class="row">
            <div class="columns">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <!-- docs say no first variable... -->
                        <li *ngFor="let link of links; let last = last; let index  = index " [class.disabled]='last'>
                            <span [ngSwitch]="last && index !== 0">
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