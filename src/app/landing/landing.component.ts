import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  news_items:JSON;
  Titles:Array<String> = new Array<String>(10);
  Images:Array<String> = new Array<String>(10);
  Text:Array<String> = new Array<String>(10);
  URLS:Array<String>= new Array<String>(10);

  constructor() { }

  ngOnInit(): void {
  }

}
