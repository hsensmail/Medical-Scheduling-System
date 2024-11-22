import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Appointment {
  name:string,
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointments: Appointment[] = [];
  private appointmentsSubject = new BehaviorSubject<Appointment[]>(this.appointments);
 // appointments$ = this.appointmentsSubject.asObservable(); // Observable to subscribe to the appointment list

  // Observable to get the list of appointments
  getAppointments() {
    return this.appointmentsSubject.asObservable();
  }

  // Method to add a new appointment
  addAppointment(appointment: Appointment): { success: boolean; message: string } {
    if (this.isDuplicate(appointment)) {
      return { success: false, message: 'Duplicate appointment found!' };
    }

    this.appointments.push(appointment);
    this.appointmentsSubject.next(this.appointments);
    return { success: true, message: 'Appointment added successfully.' };
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    this.appointmentsSubject.next(this.appointments);
  }

  getAppointment(index: number): Appointment | null {
    return this.appointments[index] || null;
  }

  updateAppointment(index: number, updatedAppointment: Appointment): { success: boolean; message: string } {
    if (this.isDuplicate(updatedAppointment, index)) {
      return { success: false, message: 'Duplicate appointment found!' };
    }

    this.appointments[index] = updatedAppointment;
    this.appointmentsSubject.next(this.appointments);
    return { success: true, message: 'Appointment updated successfully.' };
  }

  private isDuplicate(appointment: Appointment, excludeIndex: number | null = null): boolean {
    return this.appointments.some((existing, index) => {
      // Exclude the currently edited appointment from duplicate check
      if (excludeIndex !== null && index === excludeIndex) {
        return false;
      }
      return (
        existing.name.toLowerCase() === appointment.name.toLowerCase() &&
        existing.doctorName.toLowerCase() === appointment.doctorName.toLowerCase() &&
        existing.appointmentDate === appointment.appointmentDate &&
        existing.appointmentTime === appointment.appointmentTime
      );
    });
  }
  getUniqueDoctors(): string[] {
    const doctors = this.appointments.map(appointment => appointment.doctorName);
    return Array.from(new Set(doctors)); // Remove duplicates
  }
}
