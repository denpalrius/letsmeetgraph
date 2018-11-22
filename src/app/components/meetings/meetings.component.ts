import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { MatSnackBar } from '@angular/material';
import { combineLatest } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface NewNotebook {
  notebookName: string;
  sectionName: string;
  pageTitle: string;
  pageContent: string;
}

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  newNotebookForm: FormGroup;

  panelOpenState = false;
  allNotebooks: MicrosoftGraph.Notebook[];

  loadingMeetings = false;

  constructor(
    private graphService: GraphService,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.prepareForm();
    this.loadAllNotebooks();
  }

  prepareForm() {
    this.newNotebookForm = this.fb.group({
      notebook: [null, Validators.required],
      section: [null, Validators.required],
      page: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  loadAllNotebooks() {
    this.loadingMeetings = true;

    this.graphService.allNotebooks().subscribe(res => {
      if (res) {
        this.allNotebooks = res.value;
      }
      this.loadingMeetings = false;
    });
  }

  shareNotes(newMeetingNotes: NewNotebook) {
    this.loadingMeetings = true;

    this.graphService
      .createNotebook({
        displayName: `${newMeetingNotes.notebookName}`,
      })
      .subscribe(res => {
        if (res) {
          const createdNotebook: MicrosoftGraph.Notebook = res;
          this.graphService
            .createNotebookSection(createdNotebook.id, {
              displayName: newMeetingNotes.sectionName,
            })
            .subscribe(results => {
              if (results) {
                const createdSection: MicrosoftGraph.OnenoteSection = results;

                this.graphService
                  .createNotebookPage(createdSection.id, {
                    title: newMeetingNotes.pageTitle,
                    content: newMeetingNotes.pageContent,
                  })
                  .subscribe(pageCreationResults => {
                    if (pageCreationResults) {
                      const message = `Meeting notes have been shared on this notebook: ${
                        pageCreationResults.title
                      }`;

                      this.newNotebookForm.reset();
                      this.loadingMeetings = false;

                      this.sendEmails(pageCreationResults);

                    } else {
                      this.loadingMeetings = false;

                      this.showSnackBar(
                        `There was an error creating the notebook`,
                      );
                    }
                  });
              }
            });
        }
      });
  }

  sendEmails(page: MicrosoftGraph.OnenotePage) {
    // Add default attendees
    // const meetingAttendees = [
    //   { name: 'Anna-Marie Silvester', email: 'v-annsil@microsoft.com' },
    //   { name: 'Charles Wahome', email: 'v-chgita@microsoft.com' },
    //   { name: 'Marvin Ochieng', email: 'v-edmarv@microsoft.com' },
    //   { name: 'Duncan Okwako', email: 'v-duokwa@microsoft.com' },
    //   { name: 'Denpal Mzitoh', email: 'denpalrius@gmail.com' },
    // ];

    const meetingAttendees = [
      { name: 'Denpal Mzitoh', email: 'denpalrius@gmail.com' },
    ];

    const emailContent =
      '<!DOCTYPE html>' +
      '<html>' +
      '  <head>' +
      '    <title>Meeting notes:' +
      page.title +
      '</title>' +
      '    <meta name="created" content="' +
      page.createdDateTime +
      '" />' +
      '  </head>' +
      '  <body>' +
      '    <p>You have received a Onenote from a meeting you attended recently</p>' +
      '    <p>:</p>' +
      '<a href="' +
      page.links.oneNoteClientUrl.href +
      '"><strong>Open in you app</strong></a><br>' +
      '<a href="' +
      page.links.oneNoteWebUrl.href +
      '"><strong>Open in browser</strong></a>' +
      '  </body>' +
      '</html>';

    const recepients = meetingAttendees.map(res => {
      return {
        emailAddress: {
          address: res.email,
          name: res.name,
        },
      };
    });

    const message: microsoftgraph.Message = {
      subject: `Meeting Notes are now available`,
      importance: `normal`,
      body: {
        contentType: 'html',
        content: emailContent,
      },
      toRecipients: recepients,
    };

    this.graphService.sendEmail(message).subscribe(sendResults => {
      if (sendResults) {
        const successMessage = `${
          sendResults.subject
        }: Meeting notes have been shared on email:`;

        // this.showSnackBar(successMessage);
      }
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

  onSubmit() {
    if (this.newNotebookForm.valid) {
      const details: NewNotebook = {
        notebookName: this.newNotebookForm.value.notebook,
        sectionName: this.newNotebookForm.value.section,
        pageTitle: this.newNotebookForm.value.page,
        pageContent: this.newNotebookForm.value.content,
      };
      this.shareNotes(details);
    }
  }
}
