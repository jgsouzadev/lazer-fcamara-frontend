import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Platforms, PlatformQueue } from '../components/queue-in/queue-in.component'

interface Get {
  options: Array<Platforms>;
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
    console.log('getPlatforms works!');
    return this.httpClient.get<Get>("https://www.fakeapi.online/api/apis/jaimemathias/api/platform")
  }

  enterQueue(user) {
    return this.httpClient.post<Post>('https://www.fakeapi.online/api/apis/jaimemathias/api/fila/checkin', user)
  }
}
