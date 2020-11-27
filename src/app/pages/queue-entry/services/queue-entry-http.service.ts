import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Platforms, PlatformQueue } from '../queue-entry.component'
import { AuthService } from '../../../auth.service'

interface GetPlatforms {
  platforms: Array<Platforms>;
  queue: Array<PlatformQueue>;
}

interface PostUser {
  userInfo: {
    id: number
    position: number
  }
}

interface GetPlatformQueue {
  queue: Array<PlatformQueue>
}

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
    return this.httpClient.get<GetPlatforms>(
      "https://www.fakeapi.online/api/apis/jaimemathias/api/platform",
      { headers: this.authService.authHeaders() }
    )
  }

  enterQueue(selectedPlatform) {
    return this.httpClient.post<PostUser>(
      'https://www.fakeapi.online/api/apis/jaimemathias/api/queue/checkin', 
      selectedPlatform,
      { headers: this.authService.authHeaders() },
    )
    // Maybe do ../checkin/selectedPlatform? it'd have to change the method
  }

  getPlatformQueue() {
    return this.httpClient.get<GetPlatformQueue>(
      'https://www.fakeapi.online/api/apis/jaimemathias/api/platform/platform-queue', 
      { headers: this.authService.authHeaders() }
    )
  }

  getUserPosition(userId) {
    return this.httpClient.get<GetUserPosition>(
      'https://www.fakeapi.online/api/apis/jaimemathias/api/user/position/' + userId, 
      { headers: this.authService.authHeaders() },
    )
  }

  quitQueue(userId) {
    return this.httpClient.post("https://www.fakeapi.online/api/apis/jaimemathias/api/user/queue-checkout/" + userId, 
      { status_user: false },
      { headers: this.authService.authHeaders() }
    )
    // 'post' method temporarily just to work at fakeapi, in the final version it'll be 'patch'
  }

  quitGame(userId) {
    return this.httpClient.post(
      "https://www.fakeapi.online/api/apis/jaimemathias/api/user/game-checkout/" + userId, 
      { status_user: false },
      { headers: this.authService.authHeaders() }
    )
    // 'post' method temporarily just to work at fakeapi, in the final version it'll be 'patch'
  }

  disableNotifications(userId) {
    return this.httpClient.post(
      "https://www.fakeapi.online/api/apis/jaimemathias/api/user/disable-notification/" + userId, 
      { status_user: false },
      { headers: this.authService.authHeaders() }
    )
    // 'post' method temporarily just to work at fakeapi, in the final version it'll be 'patch'
  }
}
