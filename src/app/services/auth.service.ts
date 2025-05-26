import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router:Router,
    private route: ActivatedRoute
  ) { }

    public setUserToken(user: any): Observable<any> {
    let encryptUser = btoa(JSON.stringify(user))
    localStorage.setItem('eniyan', encryptUser);
    return of({
      message: `${user?.email?.split("@")[0]} has loggedIn successfully!`,
      data: user
    })
  }

  public getUserData(): string | null {
    return localStorage.getItem('eniyan');
  }

    public decodeUserDetails():any{
    let getUserData:any = this.getUserData();
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
