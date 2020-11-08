import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserBean } from 'src/app/_model/UserBean';

@Component({
  selector: 'app-customer-form-container',
  templateUrl: './customer-form-container.component.html',
  styleUrls: ['./customer-form-container.component.scss']
})
export class CustomerFormContainerComponent implements OnInit {

  customerForm: FormGroup;
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      'customerDNI': new FormControl(''),
      'customerName': new FormControl(''),
      'customerLastName': new FormControl(''),
      'customerUserName': new FormControl(''),
      driverPassword: [''],
      driverConfirmPassword: ['']
    })
  }

  public register(): void{
    let newUser = new UserBean();
    newUser.documentNumber = this.customerForm.value['customerDNI'];
    newUser.nombre = this.customerForm.value['customerName'];
    newUser.lastName = this.customerForm.value['customerLastName'];
    newUser.username = this.customerForm.value['customerUserNamer'];
    newUser.password = this.customerForm.value['customerPassword'];
  }
}
