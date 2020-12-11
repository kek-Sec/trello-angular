import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  constructor(private http: HttpClient) {}

  getCards(): Observable<JSON> {
    const url = `https://api.trello.com/1/lists/5fd2a994b357a23260e2b83c/cards?key=90ec957c4e8cdf8ace5677a945ff1d21&token=85d4cc5d590944feb7cb2d79327514a74e110fefa5bbddbb7d25348c848a7c79`;
    return this.http.get<JSON>(url).pipe(tap((_) => console.log(`got cards!`)));
  }

  addCard(Author, Quote, Image_url): Observable<JSON> {
    const url =
      'https://api.trello.com/1/cards?key=90ec957c4e8cdf8ace5677a945ff1d21&token=85d4cc5d590944feb7cb2d79327514a74e110fefa5bbddbb7d25348c848a7c79&idList=5fd2a994b357a23260e2b83c&name=' +
      Author +
      '&desc=' +
      Quote +
      '&urlSource=' +
      Image_url;

    return this.http
      .post<JSON>(url, null)
      .pipe(tap((_) => console.log('posted card!')));
  }
  getAttachment(card_id, attachment_id): Observable<JSON> {
    const url =
      'https://api.trello.com/1/cards/' +
      card_id +
      '/attachments/' +
      attachment_id +
      '/?key=90ec957c4e8cdf8ace5677a945ff1d21&token=85d4cc5d590944feb7cb2d79327514a74e110fefa5bbddbb7d25348c848a7c79';
    return this.http
      .get<JSON>(url)
      .pipe(tap((_) => console.log(`got attachment!`)));
  }

  deleteCard(card_id): Observable<JSON> {
    const url =
      'https://api.trello.com/1/cards/' +
      card_id +
      '/?key=90ec957c4e8cdf8ace5677a945ff1d21&token=85d4cc5d590944feb7cb2d79327514a74e110fefa5bbddbb7d25348c848a7c79';
      return this.http.delete<JSON>(url).pipe(tap((_) => console.log('deleted card!')));
  }

  updateCard(Author, Quote, Image_url,ID): Observable<JSON> {
    const url =
      'https://api.trello.com/1/cards/' + ID + '?key=90ec957c4e8cdf8ace5677a945ff1d21&token=85d4cc5d590944feb7cb2d79327514a74e110fefa5bbddbb7d25348c848a7c79&idList=5fd2a994b357a23260e2b83c&name=' +
      Author +
      '&desc=' +
      Quote +
      '&urlSource=' +
      Image_url;

    return this.http
      .put<JSON>(url, null)
      .pipe(tap((_) => console.log('posted card!')));
  }}
