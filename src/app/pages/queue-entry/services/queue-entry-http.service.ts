import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Platforms, PlatformQueue } from '../queue-entry.component'
import { AuthService } from '../../../auth.service'
import { environment } from 'src/environments/environment';

interface GetUserPosition {
  position: number
}

@Injectable({
  providedIn: 'root'
})
export class QueueEntryHttpService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getPlatforms() {
    return this.httpClient.get<Array<Platforms>>(
      //"https://www.fakeapi.online/api/apis/jaimemathias/api/platform",
      `${environment.apiUrl}/platforms`,
      { headers: this.authService.authHeaders() }
    )
  }
    

  enterQueue({ id }) {
    const platform = id
    
    return this.httpClient.put<any>(
      //'https://www.fakeapi.online/api/apis/jaimemathias/api/queue/checkin', 
      `${environment.apiUrl}/queues`,
      JSON.stringify({platform}),
      { headers: this.authService.authHeaders() },
    )
  }

  getPlatformQueue() {
    return this.httpClient.get<Array<PlatformQueue>>(
      //"https://www.fakeapi.online/api/apis/jaimemathias/api/platform/platform-queue",
      `${environment.apiUrl}/queues`, 
      { headers: this.authService.authHeaders() }
    )
  }

  getUserPosition({ id }) {
    const platform = id

    return this.httpClient.put<GetUserPosition>(
      //'https://www.fakeapi.online/api/apis/jaimemathias/api/user/position/' + userId, 
      `${environment.apiUrl}/queues/polling/`,
      JSON.stringify({platform}),
      { headers: this.authService.authHeaders() },
    )
  }

  quitQueue({ id }) {
    const platform = id

    return this.httpClient.put(
      `${environment.apiUrl}/queues/exit`,
      //"https://www.fakeapi.online/api/apis/jaimemathias/api/user/queue-checkout/" + '1',
      JSON.stringify({platform}),
      { headers: this.authService.authHeaders() }
    )
  }

  disableNotifications() {
    return this.httpClient.post(
      "https://www.fakeapi.online/api/apis/jaimemathias/api/user/disable-notification/" + '1', 
      { status_user: false },
      { headers: this.authService.authHeaders() }
    )
    // 'post' method temporarily just to work at fakeapi, in the final version it'll be 'put'
  }
}
