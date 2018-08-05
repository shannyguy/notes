import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Tag } from '../models/tag';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  // Note that will be edited in the component
  note : Note;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
    private service: NoteService,
    private tagService: TagService,
	) {}

  ngOnInit() {

    this.route.paramMap.pipe(switchMap((params: ParamMap) =>
        this.service.get(params.get('id')))
    ).subscribe(result => {
      console.log("Result", result);
      this.note = result;
    });
    
  }

  onSubmit(note: Note){
    console.log("Note id: " + note.id);
    if(note.id){
      this.service.update(note);
      console.log("Updated: ", note);
    }else{
      this.service.add(note);
      console.log("Added: ", note);
    }
    
  }
  onCancel(){
    console.log("Update action was cancelled");
  }

  add(text: string): void {
    const value = text;
    console.log("Adding tag: " + value);
    // Add our fruit
    if ((value || '').trim()) {
      this.note.tags.push({text: value.trim()});
      this.tagService.add(value);
    }
  }

  remove(tag: Tag): void {
    console.log("Remove tag: " + tag.text);
    const index = this.note.tags.indexOf(tag);

    if (index >= 0) {
      this.note.tags.splice(index, 1);
    }
    console.log("Current tags state: " + this.note.tags);
  }

}
