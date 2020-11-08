import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserBean } from 'src/app/_model/UserBean';

@Component({
  selector: 'app-farmer-form-container',
  templateUrl: './farmer-form-container.component.html',
  styleUrls: ['./farmer-form-container.component.scss']
})
export class FarmerFormContainerComponent implements OnInit {
  driverForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.driverForm = this.formBuilder.group({
      'farmerDNI': new FormControl(''),
      'farmerName': new FormControl(''),
      'farmerLastName': new FormControl(''),
      'farmerUserName': new FormControl(''),
      driverPassword: [''],
      driverConfirmPassword: ['']
    })
  }

  public register(): void{
    let newUser = new UserBean();
    newUser.documentNumber = this.driverForm.value['farmerDNI'];
    newUser.nombre = this.driverForm.value['farmerName'];
    newUser.lastName = this.driverForm.value['farmerLastName'];
    newUser.username = this.driverForm.value['farmerUserNamer'];
    newUser.password = this.driverForm.value['farmerPassword'];
  }


}
