import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMeetingComponent } from './components/create-meeting/create-meeting.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarContainerComponent } from './components/calendar-container/calendar-container.component';

@NgModule({
  declarations: [CreateMeetingComponent, CalendarContainerComponent],
  imports: [CommonModule, CalendarRoutingModule, SharedModule],
})
export class CalendarModule {}
