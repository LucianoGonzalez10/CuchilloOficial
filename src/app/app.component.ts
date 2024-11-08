import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddCuchillosComponent } from "./components/add-cuchillos/add-cuchillos.component";
import { CommonModule } from '@angular/common';
import { ListCuchillosComponent } from "./components/list-cuchillos/list-cuchillos.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-de-cuchillos';
}
