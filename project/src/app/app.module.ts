import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { WorkoutProgramComponent } from './feature/workout-program/workout-program.component';
import { TrainersComponent } from './feature/trainers/trainers.component';
import { CardDetailsComponent } from './feature/card-details/card-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WorkoutProgramComponent,
    TrainersComponent,
    CardDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    AuthModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
