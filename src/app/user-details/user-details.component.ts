import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-login/admin.service';
import { PopUpService } from '../pop-up/pop-up.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  // Properties
  users = [];
  currentPageUsers = [];
  currentPageUsersChanges = new BehaviorSubject<any[]>([]);
  pageLimit = 5;
  currentPage = 1;
  totalPages: number;
  totalPagesArray = [];
  name: string;
  password: string;
  editIndex: number = null;

  constructor(private adminService: AdminService, private popUpService: PopUpService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.adminService.fetchUsers();
    this.route.params.subscribe(params => {
      this.currentPage = +params['page'] || 1; // Use '+' to convert string to number, default to 1 if no page parameter
      this.updateComponent();
    });
  }

  updateComponent(): void {
    this.adminService.users.subscribe(users => {
      this.users = users;
      this.totalPages = Math.ceil(this.users.length / this.pageLimit);
      this.generateTotalPagesArray();
      this.updateCurrentPageUsers();
    });
  }

  // User data manipulation methods
  changeStatus(id: any, status) {
    const user = { status: status };
    const statusMsg = status ? 'Activated' : 'Deactivated';
    this.adminService.updateUser(id, user).subscribe(
      () => {
        console.log(`User ${statusMsg}!`);
        this.handleUserUpdate();
        this.popUpService.successMsg.next(`User ${statusMsg}`);
      },
      error => this.handleError(error)
    );
  }

  onUpdate(id: any, name: string, password: string) {
    const user = { name: name, password: password };
    this.adminService.updateUser(id, user).subscribe(
      () => {
        console.log("User Updated!");
        this.handleUserUpdate();
        this.popUpService.successMsg.next('User Updated!');
      },
      error => this.handleError(error)
    );
  }

  onDelete(id: any) {
    this.adminService.deleteUser(id).subscribe(
      () => {
        console.log("User Deleted!");
        this.handleUserUpdate();
        this.popUpService.successMsg.next('User Deleted!');
      },
      error => this.handleError(error)
    );
  }

  // Pagination methods
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.navigatePage(this.currentPage);
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.navigatePage(this.currentPage);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.navigatePage(this.currentPage);
    }
  }

  updatePagination() {
    this.updateCurrentPageUsers();
    this.generateTotalPagesArray();
  }

  updateCurrentPageUsers() {
    const startIndex = (this.currentPage - 1) * this.pageLimit;
    const endIndex = Math.min(startIndex + this.pageLimit, this.users.length);
    this.currentPageUsers = this.users.slice(startIndex, endIndex);
    this.currentPageUsersChanges.next(this.currentPageUsers);
  }

  generateTotalPagesArray() {
    const range = 5;
    const halfRange = Math.floor(range / 2);
    let startPage = Math.max(1, this.currentPage - halfRange);
    let endPage = Math.min(this.totalPages, startPage + range - 1);
    if (endPage - startPage + 1 < range) {
      startPage = Math.max(1, endPage - range + 1);
    }
    this.totalPagesArray = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  // Sorting and searching methods
  onFilter(filterData) {
    console.log(filterData);
    this.adminService.fetchUsers(filterData.sortBy, filterData.sortOrder, filterData.searchValue);
    this.router.navigateByUrl(`/admin-dashboard/1`);
  }

  // Editing methods
  isEditing(index: number) {
    return this.editIndex === index;
  }

  onEdit(index) {
    this.editIndex = index;
    this.name = this.users[index].name;
    this.password = this.users[index].password;
  }

  onClose() {
    this.handleUserUpdate();
    this.editIndex = null;
    this.name = '';
    this.password = '';
  }

  // Private helper methods
  private handleUserUpdate() {
    this.adminService.fetchUsers();
    this.updatePagination();
  }

  private handleError(error) {
    console.log(error);
    this.popUpService.errorMsg.next(error.error.message);
  }

  private navigatePage(page: number) {
    this.router.navigateByUrl(`/admin-dashboard/${page}`);
  }
}
