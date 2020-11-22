import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { OrderBean } from '../../../../_model/OrderBean';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDetailBean } from '../../../../_model/OrderDetailBean';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  
  

  constructor(
    private dialogRef: MatDialogRef<OrderDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    
  }

}
