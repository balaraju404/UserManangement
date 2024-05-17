import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin-login/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  capitalLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  lowercaseLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  specialChars: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}',
    '[', ']', '|', '\\', ';', ':', '"', "'", '<', '>', ',', '.', '?', '/'];


  admin: any;
  password: string = ''
  sec: any;
  success: any;
  error: any;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('admin'));
    if (!this.admin) {
      this.router.navigate(['/admin-login']);
    }
    const char1 = this.capitalLetters[Math.floor(Math.random() * this.capitalLetters.length)];
    const char2 = this.lowercaseLetters[Math.floor(Math.random() * this.lowercaseLetters.length)];
    const char3 = this.lowercaseLetters[Math.floor(Math.random() * this.lowercaseLetters.length)];
    const char4 = this.lowercaseLetters[Math.floor(Math.random() * this.lowercaseLetters.length)];
    const char5 = this.specialChars[Math.floor(Math.random() * this.specialChars.length)];
    const char6 = this.numbers[Math.floor(Math.random() * this.numbers.length)];
    const char7 = this.numbers[Math.floor(Math.random() * this.numbers.length)];
    const char8 = this.numbers[Math.floor(Math.random() * this.numbers.length)];

    this.password = char1 + char2 + char3 + char4 + char5 + char6 + char7 + char8;
    console.log(this.password);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.valid) {
      this.adminService.signUp({ ...(form.value), status: false, adminId: this.admin.email }).subscribe(
        (res) => {
          console.log(res);
          form.reset();
          this.success = 'User created successfully.';
          this.error = null;
          this.sec = 5;
          const intervalID = setInterval(() => {
            this.sec--;
            if (this.sec === 0) {
              clearInterval(intervalID);
              this.adminService.fetchUsers();
              this.router.navigate(['/admin-dashboard']);
            }
          }, 1000);
        },
        (error) => {
          console.error(error);
          this.error = error.error.message || 'An error occurred during signup.';
          this.success = null;
        }
      );
    }
  }

}
