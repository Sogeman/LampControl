import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class User {
  id: number;
  username: string;
  nickname: string;
  bridgeIp: string;
}

const HUE_USER_RESOURCE_URL = 'http://localhost:8080/lampcontroller/resources/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  retrieveAllUsers(): Promise<Array<User>> {
    return this.httpClient.get<Array<User>>(HUE_USER_RESOURCE_URL).toPromise();
  }

  retrieveUser(nickname: string): Promise<Array<User>> {
    return this.httpClient.get<Array<User>>(HUE_USER_RESOURCE_URL + '/' + escape(nickname)).toPromise();
  }

  saveUser(user: User): Promise<any> {
    return this.httpClient.post(HUE_USER_RESOURCE_URL, user).toPromise();
  }
}
