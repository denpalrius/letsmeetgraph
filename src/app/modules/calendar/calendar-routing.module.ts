import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMeetingComponent } from './components/create-meeting/create-meeting.component';
import { CalendarContainerComponent } from './components/calendar-container/calendar-container.component';

const routes: Routes = [
  { path: '', component: CalendarContainerComponent },
  { path: 'invite', component: CreateMeetingComponent },
  { path: ':id', component: CreateMeetingComponent },
  { path: ':id/meeting', component: CreateMeetingComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
