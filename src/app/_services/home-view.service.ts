import { Observable, of } from 'rxjs';
import { AccountService } from '@app/_services';
import { User } from '@app/_models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeViewService {
  user: User;

  ngOnInit() {
    this.setUser();
  }
  constructor(private accountService: AccountService) {}

  setUser() {
    this.user = this.accountService.userValue;
  }

  getUser(): Observable<User> {
    const user = of(this.user);
    return user;
  }
}
