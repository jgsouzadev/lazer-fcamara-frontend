import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Platforms, PlatformQueue } from '../queue-entry.component'

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
    private httpClient: HttpClient
  ) { }

  getPlatforms() {
    return this.httpClient.get<GetPlatforms>("https://www.fakeapi.online/api/apis/jaimemathias/api/platform")
  }

  enterQueue(selectedPlatform) {
    return this.httpClient.post<PostUser>('https://www.fakeapi.online/api/apis/jaimemathias/api/queue/checkin', selectedPlatform)
    // Maybe do ../checkin/selectedPlatform? it'd have to change the method
  }

  getPlatformQueue() {
    return this.httpClient.get<GetPlatformQueue>('https://www.fakeapi.online/api/apis/jaimemathias/api/platform/platform-queue')
  }

  getUserPosition(userId) {
    return this.httpClient.get<GetUserPosition>('https://www.fakeapi.online/api/apis/jaimemathias/api/user/position/' + userId)
  }

  quitQueue(userId) {
    return this.httpClient.post("https://www.fakeapi.online/api/apis/jaimemathias/api/user/queue-checkout/" + userId, { status_user: false })
    // 'post' method temporarily just to work at fakeapi, in the final version it'll be 'patch'
  }

  quitGame(userId) {
    return this.httpClient.post("https://www.fakeapi.online/api/apis/jaimemathias/api/user/game-checkout/" + userId, { status_user: false })
    // 'post' method temporarily just to work at fakeapi, in the final version it'll be 'patch'
  }
}
