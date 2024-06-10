import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainComponent } from './pages/main/main.component';
import { DnaInputRestrictionDirective } from './directives/dna-input-restriction.directive';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DnaInputRestrictionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [DnaInputRestrictionDirective],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
