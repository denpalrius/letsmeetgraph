import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base-service';

@Injectable()
export class GraphService extends BaseService {
  constructor(private authService: AuthService) {
    super();
  }

  private get client() {
    return this.graphClient();
  }

  graphClient(): MicrosoftGraphClient.Client {
    return MicrosoftGraphClient.Client.init({
      authProvider: done => {
        done(null, this.authService.getAccessToken());
      },
    });
  }

  getUserDetails(): Observable<MicrosoftGraph.User> {
    const graphUser = this.client
      .api('me')
      .select('displayName, mail, userPrincipalName')
      .get()
      .then(res => {
        console.log('user:', res);
        return res;
      });

    return from(graphUser).pipe(
      map((user: MicrosoftGraph.User) => user),
      catchError(this.catchError),
    );
  }

  sendEmail(mail: MicrosoftGraph.Message): Observable<MicrosoftGraph.Message> {
    const mails = this.client
      .api('me/sendmail')
      .post({ message: mail })
      .then(res => {
        console.log('sending emails:', res);
        return res;
      });

    return from(mails).pipe(
      map((user: MicrosoftGraph.Message) => user),
      catchError(this.catchError),
    );
  }
}
