import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/tag.service';
import { Tag } from '../models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[] = [];

  constructor(private tagService : TagService) { }

  ngOnInit() {
    this.tagService.load().subscribe(result => {
      this.tags = result;
      console.log("Assigned available tags received from tags service");
    })      
  }
  onClick(tag: Tag){
    
  }

}
