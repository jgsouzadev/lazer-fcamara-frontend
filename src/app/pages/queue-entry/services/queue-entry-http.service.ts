import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Platforms, PlatformQueue } from '../queue-entry.component'

interface Get {
  platforms: Array<Platforms>;
  queue: Array<PlatformQueue>;
}

interface Post {
  userInfo: {
    id: number
    position: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class QueueEntryHttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPlatforms() {
    return this.httpClient.get<Get>("https://www.fakeapi.online/api/apis/jaimemathias/api/platform")
  }

  enterQueue(selectedPlatform) {
    return this.httpClient.post<Post>('https://www.fakeapi.online/api/apis/jaimemathias/api/queue/checkin', selectedPlatform)
    // Maybe do ../checkin/selectedPlatform? it'd have to change the method
  }

  getPlatformQueue() {
    return this.httpClient.get<any>('https://www.fakeapi.online/api/apis/jaimemathias/api/plataform/platform-queue')
  }

  getUserPosition(userId) {
    return this.httpClient.get<any>('https://www.fakeapi.online/api/apis/jaimemathias/api/user/' + userId)
  }
}
