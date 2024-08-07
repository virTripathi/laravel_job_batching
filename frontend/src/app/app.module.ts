import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressbarComponent } from './components/elements/progressbar/progressbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/elements/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProcessorComponent } from './components/pages/processor/processor.component';
import { ProcessedDataComponent } from './components/pages/processed-data/processed-data.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressbarComponent,
    NavbarComponent,
    HomeComponent,
    ProcessorComponent,
    ProcessedDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
