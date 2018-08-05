import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from '../../../node_modules/rxjs/operators';
import { PARAMETERS } from '../../../node_modules/@angular/core/src/util/decorators';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes : Note[] = [];
  latRemoved: Note;
  extension: string = '/important';
  labelText: string = 'View Inportant Only';
  currentExtension: string = '/all'

  constructor(private noteService : NoteService, 	private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap((params:ParamMap) => 
      this.noteService.load(params.get('filter')))).subscribe(result => {
        console.log(result);
        this.notes = result;
     });
     
  }

  setFilterText(){
    switch(this.currentExtension){
      case '/all':{
        this.labelText = 'View Important Only';
        break;
      }
      case '/important':{
        this.labelText = 'View All';
        break;
      }
      default: {
        this.labelText = 'View All'
      }
        
    }
  }
    
  onDelete(note: Note){
    this.noteService.delete(note);
    this.latRemoved = note;
  }

  close(element){
    element.hide();
    console.log("Closed: " + element);
  }
  undoDeletion(){
    this.noteService.add(this.latRemoved);
  }
  onUpdateImportance(note: Note){
    this.noteService.update(note);
    console.log("Updated importance: ", note);
  }

  updateView(){
    if(this.extension === '/all'){
      this.extension = '/important';
      this.labelText = 'View Inportant Only';

    }else{
      this.extension = '/all';
      this.labelText = 'View All';
    }
  }

}
