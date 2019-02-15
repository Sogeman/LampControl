import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class User {
  userId: number;
  username: string;
  nickname: string;
  bridgeIp: string;
}

// const HUE_USER_RESOURCE_URL = 'http://192.168.0.117:8080/lampcontroller/resources/users'; // für RPi
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

  saveUser(user: User): Promise<number> {
    return this.httpClient.post<number>(HUE_USER_RESOURCE_URL, user).toPromise();
  }

  deleteUser(userId: number): Promise<any> {
    return this.httpClient.delete(HUE_USER_RESOURCE_URL + '/' + userId).toPromise();
  }

}
