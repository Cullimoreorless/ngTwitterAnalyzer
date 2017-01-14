import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//import { TwitterService }   from './twitter.service';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, 
    FormsModule,
    HttpModule ],
  declarations: [ AppComponent ],
//  providers: [ TwitterService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
