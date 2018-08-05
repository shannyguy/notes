import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Rx'; // RxJS 5 Syntax

import { Observable, of } from 'rxjs';    // RxJS 6 Syntax

import { Note } from '../models/note';
import { filter } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private id_counter = 0;
  private notes : Note[] = [ 
    /*{ 
      id: 1, title: "Buy movie tickets", 
      body: "Latest MI movie looks promising",
      important: true,
      tags: []
    },
    { 
      id: 2, title: "Buy groceries", 
      body: "Arborio Rice, Saffron, Vegetable stock, Onions, Butter",
      important: false,
      tags: []
    },
    { 
      id: 3, title: "Invite guests for dinner", 
      body: "Vera and Alex",
      important: false,
      tags: []
    },*/

  ]

  constructor() { }

  public load(filter: string) : Observable<Note[]> {
    console.log("Filter: " + filter);
    if(filter==='important'){
      return of(this.notes.filter(note => {
        return note.important === true;
      }))
    }
    let index = filter.indexOf('=');
    if(index > 0){
      let tagText = filter.slice(index + 1);
      return of(this.notes.filter(note => {      
        return note.tags.find(tag => tag.text === tagText)
      }))
    }
    return of(this.notes);
  }

  public add(note: Note) {
    console.log("Added note id: " + note.id);
    if(note.id=== undefined){
      note.id = ++this.id_counter;
    } 
    this.notes.push(note);
  }

  public get(id:string) :Observable<Note> {
    if (id === 'new') {
      return of(new Note());
    }
    else {
      return of(this.notes.find(note => note.id.toString() === id))
    }
  }

  public update(note: Note){
    let index = this.notes.indexOf(note);
  	if (index > -1) {
  		this.notes[index] = note;
    }
    console.log('After update: ', this.notes);
  }

  public delete(note: Note){
    let index = this.notes.indexOf(note);
    if (index > -1) {
      this.notes.splice(index,1);
    }
    console.log('After remove: ', this.notes);
  }
}
