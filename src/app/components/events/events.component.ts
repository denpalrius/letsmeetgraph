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
    this.recepients = [];
  }

  ngOnInit() {
    this.prepareForm();
  }

  private getContent() {
    // tslint:disable-next-line:max-line-length
    return `<!doctypehtml><html><head><metaname="viewport"content="width=device-width"><metahttp-equiv="Content-Type"content="text/html;charset=UTF-8"><title>SimpleTransactionalEmail</title><style>/*-------------------------------------INLINEDWITHhtmlemail.io/inline-------------------------------------*//*-------------------------------------RESPONSIVEANDMOBILEFRIENDLYSTYLES-------------------------------------*/@mediaonlyscreenand(max-width:620px){table[class=body]h1{font-size:28px!important;margin-bottom:10px!important;}table[class=body]p,table[class=body]ul,table[class=body]ol,table[class=body]td,table[class=body]span,table[class=body]a{font-size:16px!important;}table[class=body].wrapper,table[class=body].article{padding:10px!important;}table[class=body].content{padding:0!important;}table[class=body].container{padding:0!important;width:100%!important;}table[class=body].main{border-left-width:0!important;border-radius:0!important;border-right-width:0!important;}table[class=body].btntable{width:100%!important;}table[class=body].btna{width:100%!important;}table[class=body].img-responsive{height:auto!important;max-width:100%!important;width:auto!important;}}/*-------------------------------------PRESERVETHESESTYLESINTHEHEAD-------------------------------------*/@mediaall{.ExternalClass{width:100%;}.ExternalClass,.ExternalClassp,.ExternalClassspan,.ExternalClassfont,.ExternalClasstd,.ExternalClassdiv{line-height:100%;}.apple-linka{color:inherit!important;font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;text-decoration:none!important;}.btn-primarytabletd:hover{background-color:#34495e!important;}.btn-primarya:hover{background-color:#34495e!important;border-color:#34495e!important;}}</style></head><bodyclass=""style="background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;"><tableborder="0"cellpadding="0"cellspacing="0"class="body"style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;background-color:#f6f6f6;"><tr><tdstyle="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td><tdclass="container"style="font-family:sans-serif;font-size:14px;vertical-align:top;display:block;Margin:0auto;max-width:580px;padding:10px;width:580px;"><divclass="content"style="box-sizing:border-box;display:block;Margin:0auto;max-width:580px;padding:10px;"><!--STARTCENTEREDWHITECONTAINER--><spanclass="preheader"style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;">Thisispreheadertext.Someclientswillshowthistextasapreview.</span><tableclass="main"style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;background:#ffffff;border-radius:3px;"><!--STARTMAINCONTENTAREA--><tr><tdclass="wrapper"style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;"><tableborder="0"cellpadding="0"cellspacing="0"style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;"><tr><tdstyle="font-family:sans-serif;font-size:14px;vertical-align:top;"><pstyle="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Hithere,</p><pstyle="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">SometimesyoujustwanttosendasimpleHTMLemailwithasimpledesignandclearcalltoaction.Thisisit.</p><tableborder="0"cellpadding="0"cellspacing="0"class="btnbtn-primary"style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;box-sizing:border-box;"><tbody><tr><tdalign="left"style="font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;"><tableborder="0"cellpadding="0"cellspacing="0"style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:auto;"><tbody><tr><tdstyle="font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#3498db;border-radius:5px;text-align:center;"><ahref="http://htmlemail.io"target="_blank"style="display:inline-block;color:#ffffff;background-color:#3498db;border:solid1px#3498db;border-radius:5px;box-sizing:border-box;cursor:pointer;text-decoration:none;font-size:14px;font-weight:bold;margin:0;padding:12px25px;text-transform:capitalize;border-color:#3498db;">CallToAction</a></td></tr></tbody></table></td></tr></tbody></table><pstyle="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Thisisareallysimpleemailtemplate.Itssolepurposeistogettherecipienttoclickthebuttonwithnodistractions.</p><pstyle="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Goodluck!Hopeitworks.</p></td></tr></table></td></tr><!--ENDMAINCONTENTAREA--></table><!--STARTFOOTER--><divclass="footer"style="clear:both;Margin-top:10px;text-align:center;width:100%;"><tableborder="0"cellpadding="0"cellspacing="0"style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;"><tr><tdclass="content-block"style="font-family:sans-serif;vertical-align:top;padding-bottom:10px;padding-top:10px;font-size:12px;color:#999999;text-align:center;"><spanclass="apple-link"style="color:#999999;font-size:12px;text-align:center;">CompanyInc,3AbbeyRoad,SanFranciscoCA94102</span><br>Don'tliketheseemails?<ahref="http://i.imgur.com/CScmqnj.gif"style="text-decoration:underline;color:#999999;font-size:12px;text-align:center;">Unsubscribe</a>.</td></tr><tr><tdclass="content-blockpowered-by"style="font-family:sans-serif;vertical-align:top;padding-bottom:10px;padding-top:10px;font-size:12px;color:#999999;text-align:center;">Poweredby<ahref="http://htmlemail.io"style="color:#999999;font-size:12px;text-align:center;text-decoration:none;">HTMLemail</a>.</td></tr></table></div><!--ENDFOOTER--><!--ENDCENTEREDWHITECONTAINER--></div></td><tdstyle="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td></tr></table></body></html>`;
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
          this.showSnackBar(`Event: ${res.subject} created successfully`);
        } else {
          this.showSnackBar(`The event was not created :( `);
        }
      });
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
        dateTime: moment().format(),
        timeZone: 'Africa/Nairobi',
      },
      end: {
        dateTime: moment().format(),
        timeZone: 'Africa/Nairobi',
      },
      attendees: attendees,
      location: {
        displayName: 'Camp, Nou, Barcelona, Spain',
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
