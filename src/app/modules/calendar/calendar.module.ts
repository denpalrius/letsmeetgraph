import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMeetingComponent } from './components/create-meeting/create-meeting.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateMeetingComponent],
  imports: [CommonModule, CalendarRoutingModule, SharedModule],
})
export class CalendarModule {}
