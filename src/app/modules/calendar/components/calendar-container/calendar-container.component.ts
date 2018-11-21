import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GraphService } from 'src/app/services/graph.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss'],
})
export class CalendarContainerComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  loggedInUser: MicrosoftGraph.User;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private graphService: GraphService,
  ) {}

  ngOnInit() {
    this.graphService.getUserDetails().subscribe(user => {
      this.loggedInUser = user;
    });

    const message: MicrosoftGraph.Message = {
      subject: 'Meet for lunch?',
      body: {
        contentType: 'html',
        content: 'The new cafeteria is open.',
      },
      toRecipients: [
        {
          emailAddress: {
            address: 'denpalrius@gmail.com',
          },
        },
        {
          emailAddress: {
            address: 'riungu@quantumfig.com',
          },
        },
      ],
    };

    this.graphService.sendEmail(message).subscribe(res => {
      console.log(res);
    });
  }
}
