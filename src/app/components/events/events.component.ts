import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

interface NewEvent {
  subject: string;
  content: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  newEmailForm: FormGroup;
  newRecepientForm: FormGroup;
  recepients: { name: string; email: string }[];

  constructor(
    private graphService: GraphService,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder,
  ) {
    // this.recepients = [
    //   { name: 'Anna-Marie Silvester', email: 'v-annsil@microsoft.com' },
    //   { name: 'Charles Wahome', email: 'v-chgita@microsoft.com' },
    //   { name: 'Marvin Ochieng', email: 'v-edmarv@microsoft.com' },
    //   { name: 'Duncan Okwako', email: 'v-duokwa@microsoft.com' },
    // ];
    this.recepients = [
      { name: 'Dennor', email: 'denpalrius@gmail.com' },
      { name: 'Mzitoh', email: 'riungu@quantumfig.com' },
    ];
  }

  ngOnInit() {
    this.prepareForm();
  }

  prepareForm() {
    this.newEmailForm = this.fb.group({
      subject: [
        'Annual Strategic Planning Retreat – 2018',
        Validators.required,
      ],
      content: [null, Validators.required],
    });

    this.newRecepientForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
    });
  }

  addRecepient(name: string, email: string) {
    if (this.newRecepientForm.valid) {
      this.recepients.push({ name: name, email: email });
    }
  }

  onSubmitRecepient() {
    if (this.newRecepientForm.valid) {
      const recepientDetails = this.newRecepientForm.value;

      if (this.recepients.indexOf(recepientDetails) === -1) {
        this.recepients.push({
          name: recepientDetails.name,
          email: recepientDetails.email,
        });

        this.newRecepientForm.reset();
      }
    } else {
      this.newRecepientForm.markAsDirty();
    }
  }

  onSubmit() {
    if (this.newEmailForm.valid) {
      const details: NewEvent = this.newEmailForm.value;
      const event = this.constructEvent(
        details.subject,
        details.content,
        this.recepients,
      );

      this.graphService.createEvent(event).subscribe(res => {
        if (res) {
          this.newEmailForm.reset();
          this.recepients = [];

          this.showSnackBar(`Event: ${res.subject} was sent successfully`);
        } else {
          this.showSnackBar(`The event was not created :( `);
        }
      });
    } else {
      this.newEmailForm.markAsDirty();
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

  constructEvent(
    subject: string,
    body: string,
    recepients,
  ): microsoftgraph.Event {
    const attendees = recepients.map(res => {
      return {
        emailAddress: {
          address: res.email,
          name: res.name,
        },
        type: 'required',
      };
    });

    console.log(attendees);

    const newEvent: microsoftgraph.Event = {
      subject: subject,
      organizer: {
        emailAddress: {
          address: 'meganb@M365B815254.onmicrosoft.com',
          name: 'Dennis Riungu',
        },
      },
      body: {
        contentType: 'html',
        content: body,
      },
      start: {
        dateTime: moment()
          .add(20, 'd')
          .format(),
        timeZone: 'Africa/Nairobi',
      },
      end: {
        dateTime: moment()
          .add(21, 'd')
          .format(),
        timeZone: 'Africa/Nairobi',
      },
      attendees: attendees,
      location: {
        displayName: 'The Oval, Westlands, Nairobi, Kenya',
        locationType: 'default',
      },
    };

    return newEvent;
  }

  // this.graphService.getUserDetails().subscribe(user => {
  //   this.loggedInUser = user;
  // });

  // const message: MicrosoftGraph.Message = {
  //   subject: 'Meet for lunch?',
  //   body: {
  //     contentType: 'html',
  //     content: 'The new cafeteria is open.',
  //   },
  //   toRecipients: [
  //     {
  //       emailAddress: {
  //         address: 'denpalrius@gmail.com',
  //       },
  //     },
  //     {
  //       emailAddress: {
  //         address: 'riungu@quantumfig.com',
  //       },
  //     },
  //   ],
  // };

  // this.graphService.sendEmail(message).subscribe(res => {
  //   console.log(res);
  // });

  // this.graphService.createEvent(newEvent).subscribe(res => {
  //   console.log('event: ', res);
  // });

  // this.graphService.createEvent(newEvent).subscribe(res => {
  //   console.log('events: ', res);
  // });
}
