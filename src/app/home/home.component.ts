import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      this.router.navigate(['/admin-login']);
    }
  }

  onLogout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/admin-login']);
  }
}
