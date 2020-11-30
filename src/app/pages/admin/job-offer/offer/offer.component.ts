import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OfferDetailComponent } from '../offer-detail/offer-detail.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  moreDetails(){
    this.dialog.open(OfferDetailComponent, {
      width :'50%',
      minHeight: "50%",
      minWidth : "400px"
    });
  }

}
