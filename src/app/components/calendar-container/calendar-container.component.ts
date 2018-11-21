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
    // this.graphService.getUserDetails().subscribe(user => {
    //   this.loggedInUser = user;
    // });

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

    // this.graphService.sendEmail(message).subscribe(res => {
    //   console.log(res);
    // });

    const newEvent: MicrosoftGraph.Event = {
      subject: 'Annual Strategic Planning Retreat – 2018',
      organizer: {
        emailAddress: {
          address: 'meganb@M365B815254.onmicrosoft.com',
          name: 'Dennis Swope',
        },
      },
      body: {
        contentType: 'html',
        content: 'Lets kick-start this event planning',
      },
      start: {
        dateTime: '2018-08-30T11:00:00',
        timeZone: 'Pacific Standard Time',
      },
      end: {
        dateTime: '2019-08-30T12:00:00',
        timeZone: 'Pacific Standard Time',
      },
      recurrence: {
        pattern: {
          type: 'weekly',
          interval: 1,
          daysOfWeek: ['monday'],
        },
        range: {
          type: 'endDate',
          startDate: '2018-2-2',
          endDate: '2019-12-31',
        },
      },
      attendees: [
        {
          emailAddress: {
            address: 'denpalrius@gmail.com',
            name: 'Dennis Swope',
          },
          type: 'required',
        },
        {
          emailAddress: {
            address: 'riungu@quantumfig.com',
            name: 'Riungu Mzitoh',
          },
          type: 'required',
        },
      ],
      location: {
        displayName: 'Conf Room 3; Fourth Coffee; Home Office',
        locationType: 'default',
      },
      locations: [
        {
          displayName: 'Conf Room 3',
        },
        {
          displayName: 'Fourth Coffee',
          address: {
            street: '4567 Main St',
            city: 'Redmond',
            state: 'WA',
            countryOrRegion: 'US',
            postalCode: '32008',
          },
          coordinates: {
            latitude: 47.672,
            longitude: -102.103,
          },
        },
        {
          displayName: 'Home Office',
        },
      ],
    };
    // this.graphService.createEvent(newEvent).subscribe(res => {
    //   console.log('event: ', res);
    // });

    // this.graphService.createEvent(newEvent).subscribe(res => {
    //   console.log('events: ', res);
    // });
  }
}
