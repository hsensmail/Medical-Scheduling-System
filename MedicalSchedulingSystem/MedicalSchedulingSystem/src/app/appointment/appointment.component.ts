import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-appointment',
  imports: [FormsModule, NgIf],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  name: string = '';
  doctorName: string = '';
  appointmentDate: string = '';
  appointmentTime: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isEdit: boolean = false;
  editIndex: number | null = null;



  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const index = +params['id'];
      if (!isNaN(index)) {
        const appointment = this.appointmentService.getAppointment(index);
        if (appointment) {
          this.isEdit = true;
          this.editIndex = index;
          this.name = appointment.name;
          this.doctorName = appointment.doctorName;
          this.appointmentDate = appointment.appointmentDate;
          this.appointmentTime = appointment.appointmentTime;
        }
      }
    });
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (!this.name || !this.doctorName || !this.appointmentDate || !this.appointmentTime) {
      alert('All fields are required.');
      return;
    }
    const appointment = {
      name: this.name,
      doctorName: this.doctorName,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
    };

    if (this.isEdit && this.editIndex !== null) {
      this.appointmentService.updateAppointment(this.editIndex, appointment);
    } else {
      const result = this.appointmentService.addAppointment(appointment);
      if (!result.success) {
        alert(result.message);
        return;
      }
    }

    this.router.navigate(['/appointment-list']); // Navigate back to the list

  }


}
