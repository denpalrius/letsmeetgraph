import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  get appId() {
    return 'd4474dff-0ae8-4f4f-a8b9-5ff9985313a3';
  }

  get scope() {
    return 'Calendars.ReadWrite Notes.ReadWrite Mail.Send User.Read';
  }

  get authUrl() {
    return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
  }

  get graphRoot() {
    return 'https://graph.microsoft.com/v1.0/me';
  }

  get messagesUrl() {
    return `${this.graphRoot}/messages`;
  }

  get sendMailUrl() {
    return `${this.graphRoot}/sendMail`;
  }

  get eventsUrl() {
    return `${this.graphRoot}/events`;
  }
}
