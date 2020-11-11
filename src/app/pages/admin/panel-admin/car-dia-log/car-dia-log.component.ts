import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { OrderDetailComponent } from 'src/app/_shared/order-detail/order-detail.component';
import { DataClientComponent } from 'src/app/_shared/data-client/data-client.component';
import { SharedService } from 'src/app/_service/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderBean } from 'src/app/_model/OrderBean';


@Component({
  selector: 'app-car-dia-log',
  templateUrl: './car-dia-log.component.html',
  styleUrls: ['./car-dia-log.component.scss']
})
export class CarDiaLogComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'weight', 'quantity'];
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  data = Object.assign( ELEMENT_DATA);
  quantity=1;
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);
  totalRow: number;
  valor1=null;
  constructor( public dialogo: MatDialog,
    public dialog: MatDialogRef<CarDiaLogComponent>,
    public sharedService: SharedService,
    private router: Router,
    private snackBar: MatSnackBar,) { }

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

  sendOrder() {
    const numSelected = this.selection.selected;
    if (numSelected.length == 0) {//debe ser > 0
      if (!this.sharedService.userSession){
        this.snackBar.open('Inicie sesión para enviar la orden', 'INFO', { duration: 5000 });
        this.closeDialog();
        this.router.navigate(['auth/login']);
        return;
      }
      if(this.quantity==0){
        this.sendOrderConfirm();
      }else{
        this.dialogo
        .open(DataClientComponent, {
          width:'30%',
          height:'60%',
          data: new OrderBean()
        })
        .afterClosed() 
        .subscribe((confirmado) => {
            if (confirmado){
              this.sendOrderConfirm();
            }       
        });
      }
    } else {
      alert('Seleccione algun producto');
    }
  }

  sendOrderConfirm():void{
    const numSelected = this.selection.selected;
    const params = {
      title: 'Generar pedido',
      description: '¿Desea realizar el pedido?',
      inputData: true
    };
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: params,
        width: '25%',
        height: '35%',
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
            console.log("Hola");
            this.closeDialog();
                this.dialogo.open(OrderDetailComponent, {
                  width: '600px',
                });          
          }
          this.dialog.close();
      }); 
  }

}

export interface PeriodicElement {
  name: string;
  weight: number;
  quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hyd', weight: 1.0, quantity: 1},
  {name: 'Hel', weight: 4.0, quantity: 1},
  {name: 'Par', weight: 6.9, quantity: 1},
  {name: 'Ber', weight: 9.0, quantity: 1},
  
];
