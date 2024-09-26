import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'https://api.github.com/users'
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getUser(userNickName: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${userNickName}`, this.httpOptions)
  }

  getRepositories(userNickName: string): Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(`${this.apiUrl}/${userNickName}/repos`, this.httpOptions)
  }
}
