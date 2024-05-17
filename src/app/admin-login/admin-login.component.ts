import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  private admin = {
    email: 'abc@bijib.in',
    password: '1234'
  };
  
  validationStatus: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('admin')) {
      this.router.navigate(['/admin-dashboard']);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (form.value.email === this.admin.email && form.value.password === this.admin.password) {
        console.log('Login Successful');
        this.validationStatus = true;
        localStorage.setItem('admin', JSON.stringify(this.admin));
        this.router.navigate(['/admin-dashboard']);
      } else {
        console.log('Login Failed');
        this.validationStatus = false;
      }
    }
  }
}
