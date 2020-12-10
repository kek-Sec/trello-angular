import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../trello.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  CARDS:JSON;
  Titles:Array<String> = new Array<String>(10);
  Images:Array<String> = new Array<String>(10);
  Text:Array<String> = new Array<String>(10);
  URLS:Array<String>= new Array<String>(10);

  constructor(private trelloService:TrelloService) { }

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes()
  {
    this.trelloService.getCards().subscribe(data => {
      this.CARDS = data;
      console.log(data);
    })
  }

}
