import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { provideServerRendering } from '@angular/platform-server';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'appointment-list', pathMatch: 'full' },
      { path: 'appointment-list', component: AppointmentListComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'appointment/:id', component: AppointmentComponent }, // For editing
      { path: 'calendar', component: CalendarComponent },
    ]
  },
];
