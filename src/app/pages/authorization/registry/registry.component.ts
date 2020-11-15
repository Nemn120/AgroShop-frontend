import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  @Input() title: string;
  @Input() userType: string;
  @Input() image: any;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }





}
