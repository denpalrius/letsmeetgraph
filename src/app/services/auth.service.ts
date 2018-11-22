import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private zone: NgZone,
    private router: Router,
    private configs: ConfigService,
  ) {
    super();

    this.initAuth();
  }

  initAuth() {
    hello.init(
      {
        msft: {
          id: `${this.configs.appId}`,
          oauth: {
            version: 2,
            auth: `${this.configs.authUrl}`,
          },
          scope_delim: ' ',
          form: false,
        },
      },
      { redirect_uri: window.location.href },
    );
  }

  login() {
    this.zone.runOutsideAngular(() => {
      hello('msft')
        .login({ scope: this.configs.scope })
        .then(
          () => {
            this.zone.run(() => {
              this.router.navigate(['/home']);
            });
          },
          e => console.error(e),
        );
    });
  }

  logout() {
    hello('msft')
      .logout()
      .then(
        () => (window.location.href = '/'),
        e => console.error(e.error.message),
      );
  }

  getAccessToken() {
    const msft = hello('msft').getAuthResponse();
    const accessToken = msft.access_token;
    return accessToken;
  }
}
