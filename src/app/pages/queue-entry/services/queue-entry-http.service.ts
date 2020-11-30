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
      `${environment.apiUrl}/platforms`,
      { headers: this.authService.authHeaders() }
    )
  }
    

  enterQueue({ id }) {
    const platform = id
    
    return this.httpClient.post<any>(
      `${environment.apiUrl}/queues`,
      JSON.stringify({platform}),
      { headers: this.authService.authHeaders() },
    )
  }

  getPlatformQueue() {
    return this.httpClient.get<Array<PlatformQueue>>(
      `${environment.apiUrl}/queues`, 
      { headers: this.authService.authHeaders() }
    )
  }

  getUserPosition({ id }) {
    const platform = id

    return this.httpClient.get<GetUserPosition>(
      `${environment.apiUrl}/queues/polling/` + platform,
      { headers: this.authService.authHeaders() },
    )
  }

  quitQueue({ id }) {
    const platform = id

    return this.httpClient.put(
      `${environment.apiUrl}/queues/exit`,
      JSON.stringify({platform}),
      { headers: this.authService.authHeaders() }
    )
  }

  disableNotifications() {
    return this.httpClient.put(
      `${environment.apiUrl}/queues/disable-notification`, 
      { headers: this.authService.authHeaders() }
    )
  }
}
