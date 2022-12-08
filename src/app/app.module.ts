import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DefaultComponent } from './default/default.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: DefaultComponent},
        ])
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        DefaultComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}