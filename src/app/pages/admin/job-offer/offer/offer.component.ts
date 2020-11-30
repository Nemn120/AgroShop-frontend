import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { OfferDetailComponent } from '../offer-detail/offer-detail.component';

export interface JobOffer{
  title: string;
  description: string;
  requeriments: string;
  date: string;
}

const DATA: JobOffer[] = [
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  {
    title: 'Se buscan Felipes (Esclavo)',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum amet, facere officia est maxime dolore libero sint perspiciatis suscipit consequatur! Fuga voluptatum fugiat saepe impedit? Veritatis voluptatum voluptas deserunt ut.',
    requeriments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam placeat aliquid quam voluptates illum vitae expedita. Dolor ad repellendus ab, corporis qui saepe quisquam, fugit ipsa odit numquam placeat.',
    date: '666 de marzo del 2666'
  },
  
]
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})



export class OfferComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<JobOffer> = new MatTableDataSource<JobOffer>(DATA);
  obs: Observable<any>;

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  moreDetails(job){
    this.dialog.open(OfferDetailComponent, {
      data: job,
      width :'50%',
      minHeight: "50%",
      minWidth : "400px"
    });
  }

  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
