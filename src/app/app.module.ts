import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [AppComponent, ListComponent, TabsComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
