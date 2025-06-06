import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  fullname: string = '';
  region: string = '';

  constructor() { }

  ngOnInit() {
  }

}
