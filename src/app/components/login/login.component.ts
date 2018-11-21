import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { GraphService } from 'src/app/services/graph.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loggedInUser: MicrosoftGraph.User;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private graphService: GraphService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.graphService.getUserDetails().subscribe(user => {
      this.loggedInUser = user;

      if (user) {
        this.router.navigate(['home/'], { relativeTo: this.route });
      }
    });
  }

  onLogin() {
    this.authService.login();
  }
}
