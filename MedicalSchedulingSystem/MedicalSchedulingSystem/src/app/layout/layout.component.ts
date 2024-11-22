import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private router: Router) { }
  onClick(url : string) {
    this.router.navigate([url]);
    console.log("success");
  }
}
