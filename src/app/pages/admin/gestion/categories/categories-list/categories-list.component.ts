import { Component, OnInit ,ViewChild} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

import { CategoryProductBean } from '../../../../../_model/CategoryProductBean';
import { CategoriesViewComponent } from '../categories-view/categories-view.component';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<CategoryProductBean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restService: RestService,
    private sharedService:SharedService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
   
    this.listCategories();

    this.restService.messageChange.subscribe(data => {
      console.log('messageChange: ',data);
      this.listCategories();
      this.restService.message(data.message, data.action);
    });

  }


  //list categories
  public listCategories() {

    let param = {
      data: {
        userCreateId:this.sharedService.userSession.id
      }
    }
    this.restService.requestApiRestData('categoryproduct/gcp', param)
      .subscribe(data => {
        console.log('mis categories! ', data);
        this.dataSource = new MatTableDataSource(data.datalist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log("Error al listar categorias!", error);
        this.restService.message('Error al listar Categorias!', 'Error');
      });
  }
    

  //new and update product
  newAndUpdateCategory(category?: CategoryProductBean) {

    let categorySelect = category != null ? category : new CategoryProductBean();
    this.dialog.open(CategoriesFormComponent, {
      data: categorySelect,
    });

  }

  //delete category
  deleteCategory(category: CategoryProductBean) {

    let param = {
      data: {
        'id': category.id
      }
    }
    this.restService.requestApiRestData('categoryproduct/dcp', param).subscribe(data => {
      console.log('se elimino con exito!', data);
      this.listCategories();
      this.restService.message('Categoria eliminada con exito!', 'Delete');
    },error => {
      console.log("Error al eliminar categoria! ", error);
      this.restService.message('Error al eliminar categoria!', 'Error');
    });

  }

  //view categoria
  viewCategory(categoria: CategoryProductBean){

    this.dialog.open(CategoriesViewComponent, {
      data: categoria
    });

  }

//search categoria
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


}
