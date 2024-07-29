import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable } from "rxjs"

import { User } from "../models/user"

@Injectable({
    providedIn: "root"
})

export class UsersService {

    activeUser = new BehaviorSubject<User | null>(null);

    URL = "http://localhost:3000/users";

    constructor(
        private http: HttpClient
    ){}

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.URL);
    }
    
    getUserById(userId: number): Observable<User> {
        return this.http.get<User>(`${this.URL}/${userId}`);
    }

    addUser(newUser: User): Observable<User> {
        return this.http.post<User>(this.URL, newUser);
    }

    updateUser(userId: number, updatedUser: User): Observable<User> {
        return this.http.put<User>(`${this.URL}/${userId}`, updatedUser);
    }
}