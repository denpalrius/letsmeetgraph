import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  loggedInUser: MicrosoftGraph.User;

  constructor(
    private graphService: GraphService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.graphService.getUserDetails().subscribe(user => {
      this.loggedInUser = user;
    });
  }

  logOut() {
    this.authService.logout();
  }
}
