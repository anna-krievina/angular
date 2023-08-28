import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SakuraComponent } from './sakura/sakura.component';
import { HeartComponent } from './heart/heart.component';
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AboutComponent,
    TicTacToeComponent,
    SakuraComponent,
    HeartComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,

    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },
      { path: 'tic-tac-toe', component: TicTacToeComponent },
      { path: 'sakura', component: SakuraComponent },
      { path: 'heart', component: HeartComponent },
      { path: 'calculator', component: CalculatorComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
