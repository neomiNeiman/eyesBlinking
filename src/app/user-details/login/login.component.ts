import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm = new FormGroup({

    emailFormControl: new FormControl('',
      [Validators.required,
       Validators.email,
              ]),
    password: new FormControl('',
      [Validators.required,
       Validators.minLength(6)])
  });

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  registerClickEvent(email: string, password: string) {
   // console.log(email, password);
   // const observableObj = this.http.post('https://reqres.in/api/register', 'login');
   // observableObj.subscribe((response) => console.log(response));
    this.router.navigate(['/register']);
  }

  loginClicked() {
    this.router.navigate(['/main']);
  }
}
