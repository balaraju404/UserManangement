import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin-login/admin.service';
import { Router } from '@angular/router';
import { PopUpService } from '../pop-up/pop-up.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  sec = null
  error = null;
  success = null;

  constructor(private adminService: AdminService, private router: Router, private popUpService: PopUpService) { }

  onSubmit(user: NgForm) {
    console.log(user.value);
    if (user.valid) {
      this.adminService.login(user.value).subscribe(res => {
        console.log(res);
        this.error = null;
        const response = JSON.stringify(res)
        const parsedData = JSON.parse(response)
        this.success = parsedData.message;
        this.popUpService.successMsg.next(this.success)
        this.sec = 5;
        const intervelID = setInterval(() => {
          this.sec--;
          if (this.sec == 0) {
            clearInterval(intervelID)
            this.sec = null
            this.router.navigate(['/admin-dashboard'])
          }
        }, 1000);
      }, error => {
        console.log(error);
        this.success = null;
        this.error = error.error.message;
        this.popUpService.errorMsg.next(this.error)
      })
    }
  }
}
