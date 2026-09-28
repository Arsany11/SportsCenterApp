import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { BehaviorSubject, Observable ,switchMap,tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  redirectUrl: string | null = null;
  public apiUrl = 'http://localhost:8080/auth';

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  isAuthenticated(): boolean {
    // Whether user is authenticated or not
    const token = localStorage.getItem('token');
    return !!token;
  }
  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<User>(`${this.apiUrl}/user`).subscribe({
        next: (user) => {
          this.currentUserSource.next(user);
        },
        error: (error) => {
          console.error('Error loading user:', error);
          this.logout();
        },
      });
    }
  }

    login(values: any) : Observable<User>{
    return this.http.post<LoginResponse>(
      this.apiUrl + '/login', values).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      }),
      switchMap(()=> this.getUser()),
      tap(user => {
        this.currentUserSource.next(user);
      })
    );
  }

  // login(values: any) {
  //   return this.http.post<User>(this.apiUrl + '/login', values).pipe(
  //     map((user) => {
  //       localStorage.setItem('token', user.token);
  //       this.currentUserSource.next(user);
  //     }),
  //   );
  // }

  // register (values: any){
  //   return this.http.post<User>(this.apiUrl + '/register', values).pipe(
  //     map(user => {
  //       localStorage.setItem('token', user.token);
  //       this.currentUserSource.next(user);
  //     })
  //   )
  // }

  register(values: any): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/register', values);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  getUser(): Observable<User>{
    return this.http.get<User>(
      `${this.apiUrl}/user`
    );
  }
}
