import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrelloService } from '../trello.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected aFormGroup: FormGroup;
  protected bFormGroup: FormGroup;
  @ViewChild('author', { static: true }) author: ElementRef;
  @ViewChild('quote', { static: true }) quote: ElementRef;
  @ViewChild('image_url', { static: true }) image_url: ElementRef;

  fd_init: boolean = false;
  fd_init2: boolean = false;

  CARDS: JSON;
  Titles: Array<String> = new Array<String>(10);
  ID: Array<String> = new Array<String>(10);
  Images: Array<String> = new Array<String>(10);
  Text: Array<String> = new Array<String>(10);
  URLS: Array<String> = new Array<String>(10);
  Dates: Array<String> = new Array<String>(10);

  current_id: String;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private trelloService: TrelloService
  ) {}

  ngOnInit(): void {
    this.getQuotes();
  }

  init_FormData() {
    if (!this.fd_init) {
      this.aFormGroup = this.formBuilder.group({
        author: [, Validators.required],
        quote: [, Validators.required],
        image_url: [, Validators.required],
      });
      this.fd_init = true;
    }
  }
  init_FormData2() {
    if (!this.fd_init2) {
      this.bFormGroup = this.formBuilder.group({
        author: [, Validators.required],
        quote: [, Validators.required],
        image_url: [, Validators.required],
      });
      this.fd_init2 = true;
    }
  }

  getQuotes() {
    this.trelloService.getCards().subscribe((data) => {
      this.CARDS = data;
      console.log(data);
      this.createArrays(this.CARDS);
    });
  }

  getImages(index, card_id, att_id) {
    console.log(att_id);
    this.trelloService.getAttachment(card_id, att_id).subscribe((data) => {
      this.Images[index] = data['url'];
    });
  }

  createArrays(cards: JSON) {
    let i = 0;
    for (let article in cards) {
      //limit to 10 quotes to avoid pagination
      if (i >= 10) {
        break;
      }

      this.Titles[article] = cards[article]['name'];
      this.Dates[article] = cards[article]['dateLastActivity'];
      this.Text[article] = cards[article]['desc'];
      this.URLS[article] = cards[article]['shortUrl'];
      this.getImages(
        i,
        cards[article]['id'],
        cards[article]['idAttachmentCover']
      );
      this.ID[article] = cards[article]['id'];
      i++;
      //this.Titles[article] = news_items['articles'][article]['title'];
    }
  }

  delete(ID) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this quote',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.trelloService.deleteCard(ID).subscribe((data) => {
          console.log(data);
        });
        Swal.fire('Deleted!', 'Your quote has been deleted.', 'success');
        this.getQuotes();
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your quote is safe :)', 'error');
      }
    });
  }
  add_modal(content) {
    this.fd_init2 = false;
    this.init_FormData2();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  add_card() {
    if (this.bFormGroup.valid) {
      this.trelloService
        .addCard(
          this.bFormGroup.controls['author'].value,
          this.bFormGroup.controls['quote'].value,
          this.bFormGroup.controls['image_url'].value
        )
        .subscribe((data) => {
          console.log(data);
          Swal.fire('Done...', 'Added quote!', 'success')!
          this.getQuotes();
        });
    }
    else
    {
      Swal.fire('Oops...', 'Something went wrong!', 'error')!
    }
  }

  edit_quote(content, ID) {
    this.current_id = ID;
    this.fd_init = false;
    this.init_FormData();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  update() {
    if (this.aFormGroup.valid) {
      this.trelloService.deleteCard(this.current_id).subscribe((data) => {
        console.log(data);
      });
      this.trelloService
        .addCard(
          this.aFormGroup.controls['author'].value,
          this.aFormGroup.controls['quote'].value,
          this.aFormGroup.controls['image_url'].value
        )
        .subscribe((data) => {
          console.log(data);
          Swal.fire('Done...', 'Updated quote!', 'success')!
          this.getQuotes();

        });
    }
    else
    {
      Swal.fire('Oops...', 'Something went wrong!', 'error')!
    }
  }
}
