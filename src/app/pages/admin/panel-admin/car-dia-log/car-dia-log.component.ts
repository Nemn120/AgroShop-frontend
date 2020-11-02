import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';


@Component({
  selector: 'app-car-dia-log',
  templateUrl: './car-dia-log.component.html',
  styleUrls: ['./car-dia-log.component.scss']
})
export class CarDiaLogComponent implements OnInit {

  displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol'];
  data = Object.assign( ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);
  totalRow: number;
  constructor( public dialogo: MatDialog,
    public dialog: MatDialogRef<CarDiaLogComponent>) { }

  ngOnInit(): void {
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  closeDialog() {
    this.dialog.close();
  }
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  sendOrder():void{
    const numSelected = this.selection.selected;
    const params = {
      title: 'Generar pedido',
      description: '¿Desea realizar el pedido?',
      inputData: true
    };
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: params
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
                      
          }
        
      }); 
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  
];
