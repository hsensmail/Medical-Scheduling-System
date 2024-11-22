import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // To navigate back to the appointment page


@Component({
  selector: 'app-appointment-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {

  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit() {
    // Subscribe to the appointment service to get the list of appointments
    this.appointmentService.getAppointments().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }
  deleteAppointment(index: number) {
    this.appointmentService.deleteAppointment(index);
  }

  editAppointment(index: number) {
    this.router.navigate(['/appointment', index]); // Pass index as a route parameter
  }

}
