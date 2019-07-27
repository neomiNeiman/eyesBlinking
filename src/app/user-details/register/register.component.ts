import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl('',[Validators.required,]),
    lastName: new FormControl('',[Validators.required,]),
    emailFC: new FormControl('',[Validators.required,
      Validators.email,]),
    password: new FormControl('',[Validators.required,]),
    birthday :new FormControl(new Date()),
    gender: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

}
