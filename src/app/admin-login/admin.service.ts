import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AdminService {
    private baseUrl = 'http://localhost:3000';

    users = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) { }

    // User management methods

    signUp(user) {
        return this.http.post(`${this.baseUrl}/users`, user)
    }

    login(user) {
        return this.http.post(`${this.baseUrl}/users/login`, user)
    }

    deleteUser(id) {
        return this.http.delete(`${this.baseUrl}/users/${id}`)
    }

    updateUser(id, user) {
        return this.http.patch(`${this.baseUrl}/users/${id}`, user)
    }

    // User retrieval method

    fetchUsers(sortBy = '_id', order = "asc", filterValue = '') {
        const user = JSON.parse(localStorage.getItem('admin'))
        if (!user) {
            console.log('no access');
            return;
        }
        const email = user.email;
        this.http.get(`${this.baseUrl}/users`, {
            params: {
                adminId: email,
                sortBy: sortBy,
                sortOrder: order,
                filterValue: filterValue,
            }
        }).subscribe((users) => {
            this.users.next(users);
        }, (error) => {
            console.log(error);
        })
    }
}
