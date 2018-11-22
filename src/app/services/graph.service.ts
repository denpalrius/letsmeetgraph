import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GraphService extends BaseService {
  constructor(
    private authService: AuthService,
    private readonly http: HttpClient,
    private readonly configs: ConfigService,
  ) {
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

  createEvent(
    newEvent: MicrosoftGraph.Event,
  ): Observable<MicrosoftGraph.Event> {
    const eventRequest = this.client
      .api('me/events')
      .version('v1.0')
      .post(newEvent)
      .then(res => res);

    return from(eventRequest).pipe(
      map((event: MicrosoftGraph.Event) => event),
      catchError(this.catchError),
    );
  }

  allEventsInCalendar(): Observable<MicrosoftGraph.Event[]> {
    const eventRequest = this.client
      .api('me/events')
      .version('v1.0')
      .select('subject,body,bodyPreview,organizer,attendees,location')
      .get();

    return from(eventRequest).pipe(
      map((events: MicrosoftGraph.Event[]) => events),
      catchError(this.catchError),
    );
  }

  allNotebooks(): Observable<{
    '@odata.context': any;
    value: MicrosoftGraph.Notebook[];
  }> {
    const allNotebooksRequest = this.client
      .api('me/onenote/notebooks')
      .version('v1.0')
      .get();

    return from(allNotebooksRequest).pipe(
      map(notebooks => notebooks),
      catchError(this.catchError),
    );
  }

  createNotebook(
    newNotebook: MicrosoftGraph.Notebook,
  ): Observable<MicrosoftGraph.Notebook> {
    const notebookRequest = this.client
      .api('me/onenote/notebooks')
      .version('v1.0')
      .post(newNotebook);

    return from(notebookRequest).pipe(
      map((notebook: MicrosoftGraph.Notebook) => notebook),
      catchError(this.catchError),
    );
  }

  createNotebookSection(
    notebookId: string,
    newSection: MicrosoftGraph.OnenoteSection,
  ): Observable<MicrosoftGraph.OnenoteSection> {
    const newSectionRequest = this.client
      .api(`me/onenote/notebooks/${notebookId}/sections`)
      .version('v1.0')
      .post(newSection);

    return from(newSectionRequest).pipe(
      map((section: MicrosoftGraph.OnenoteSection) => section),
      catchError(this.catchError),
    );
  }

  // This page uses the normal HTTP get instead of the Graph cient
  createNotebookPage(
    sectionId: string,
    newPage: MicrosoftGraph.OnenotePage,
  ): Observable<MicrosoftGraph.OnenotePage> {
    return this.http
      .post<MicrosoftGraph.OnenotePage>(
        `${this.configs.graphRoot}/onenote/sections/${sectionId}/pages`,
        newPage,
        {
          headers: new HttpHeaders({
            'Content-Type': 'text/html',
            'Content-Disposition': 'form-data; name="Presentation"',
            Authorization: `Bearer ${this.authService.getAccessToken()}`,
          }),
        },
      )
      .pipe(
        catchError(catchError(this.catchError)),
        map((result: any) => {
          return result;
        }),
      );
  }

  getUserDetails(): Observable<MicrosoftGraph.User> {
    const graphUser = this.client
      .api('me')
      .version('v1.0')
      .get()
      .then(res => res);

    return from(graphUser).pipe(
      map((user: MicrosoftGraph.User) => user),
      catchError(this.catchError),
    );
  }

  sendEmail(mail: MicrosoftGraph.Message): Observable<MicrosoftGraph.Message> {
    const mails = this.client
      .api('me/sendmail')
      .version('v1.0')
      .post({ message: mail })
      .then(res => res);

    return from(mails).pipe(
      map((message: MicrosoftGraph.Message) => message),
      catchError(this.catchError),
    );
  }
}
