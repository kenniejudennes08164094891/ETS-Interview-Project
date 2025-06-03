import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { loginCredentials, User } from '../models/mocks';
import { HttpStatusCode } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

 public setUserToken(user: User): Observable<any> {
  const isValidUser = user.email === loginCredentials.email && user.password === loginCredentials.password;
  if (isValidUser) {
    const encryptedUser = btoa(JSON.stringify(user));
    localStorage.setItem('eniyan', encryptedUser);

    return of({
      message: `${user.email.split("@")[0]} has logged in successfully!`,
      data: user,
      statusCode: HttpStatusCode.Ok,
    });
  }

  return of({
    message: "Invalid login credential!",
    data: null,
    statusCode: HttpStatusCode.Unauthorized,
  });
}


  public getUserData(): string | null {
    return localStorage.getItem('eniyan');
  }

  public decodeUserDetails(): any {
    let getUserData: any = this.getUserData();
    let parseData = atob(getUserData);
    return JSON.parse(parseData);
  }

  public userIsLoggedIn() {
    return this.getUserData() !== null;
  }

  public async userMockLogout(): Promise<any> {
    localStorage.clear();
    sessionStorage.clear();
    await this.router.navigate(['/login'], {
      relativeTo: this.route,
    });
    console.clear();
    setTimeout(() => location.reload(), 1000);
  }

}
