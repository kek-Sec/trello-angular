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
  Dates:Array<String>= new Array<String>(10);


  constructor(private trelloService:TrelloService) { }

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes()
  {
    this.trelloService.getCards().subscribe(data => {
      this.CARDS = data;
      console.log(data);
      this.createArrays(this.CARDS);
    })
  }

  getImages(index,card_id,att_id)
  {
    console.log(att_id);
    this.trelloService.getAttachment(card_id,att_id).subscribe(data => {
      
      this.Images[index] = data['url'];
    })
  }

  createArrays(cards:JSON)
  {
    let i = 0;
    for(let article in cards)
    {
      //limit to 10 quotes to avoid pagination
      if(i >= 10) {break;}

      this.Titles[article] = cards[article]['name'];
      this.Dates[article] = cards[article]['dateLastActivity'];
      this.Text[article] = cards[article]['desc'];
      this.URLS[article] = cards[article]['shortUrl'];
      this.getImages(i,cards[article]['id'],cards[article]['idAttachmentCover']);
      i++;
      //this.Titles[article] = news_items['articles'][article]['title'];
    }
  }
}
