import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private id_counter = 0;
  private tags : Tag[] = [];

  constructor() { }

  public load() : Observable<Tag[]> {
    console.log("Tags: " + this.tags);
    return of(this.tags);
  }

  public add(text: string){
   
    if(!this.tags.find(tag => tag.text === text)){
      this.tags.push({text: text});
      console.log("Added tag: " + text);  
    }else{
      console.log("Tag exist wasn't added: " + text);  
    }
    console.log("Tags list");
    this.tags.forEach(tag => console.log(tag.text));    
  }
}
