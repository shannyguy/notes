import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IgxSnackbarModule } from 'igniteui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule} from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { HomeComponent } from './home/home.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { TagsComponent } from './tags/tags.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatIcon } from '@angular/material';

const appRoutes: Routes = [
  { path: 'notes/:filter', component: NoteListComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'tags', component: TagsComponent }, 

  { path: 'note/:id', component: NoteEditComponent }, 

  { path: '',   redirectTo: '/home', pathMatch: 'full' },  
];

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    HomeComponent,
    NoteEditComponent,
    TagsComponent,
    MatIcon,
  ],
  imports: [
    BrowserModule,
    IgxSnackbarModule,
    FormsModule, 
    MatChipsModule,
    BrowserAnimationsModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
