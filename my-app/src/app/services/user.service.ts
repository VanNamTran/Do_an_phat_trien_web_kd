import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() { }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getUser(): BehaviorSubject<User | null> {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.userSubject.next(user);
    return this.userSubject;
  }
}

