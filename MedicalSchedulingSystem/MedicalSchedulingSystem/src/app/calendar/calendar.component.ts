import { Component, OnInit } from '@angular/core';
import { AppointmentService, Appointment } from '../appointment.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  daysInMonth: number[] = [];
  firstDayIndex: number = 0;
  appointments$: Observable<Appointment[]>;
  doctors: string[] = [];
  selectedDoctor: string | null = null;

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.getAppointments();
  }

  ngOnInit(): void {
    this.loadCalendar();
    this.doctors = this.appointmentService.getUniqueDoctors();
  }

  loadCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    this.daysInMonth = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1);
    this.firstDayIndex = new Date(year, month, 1).getDay();
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.loadCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.loadCalendar();
  }

  getAppointmentsForDay(day: number, appointments: Appointment[]): Appointment[] {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(appointment => {
      const matchesDate = appointment.appointmentDate === dateString;
      const matchesDoctor = this.selectedDoctor ? appointment.doctorName === this.selectedDoctor : true;
      return matchesDate && matchesDoctor;
    });
  }

  onDoctorChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDoctor = target.value || null;
  }
}
