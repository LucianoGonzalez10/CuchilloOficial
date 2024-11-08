import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CuchilloService } from '../../services/cuchillo.service';
import { Cuchillo } from '../../interfaces/cuchillo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-cuchillos',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './detalles-cuchillos.component.html',
  styleUrl: './detalles-cuchillos.component.css'
})
export class DetallesCuchillosComponent implements OnInit{
  cuchillo : any;

  constructor(private routes : ActivatedRoute, private http : HttpClient){}

  cuchilloService = inject(CuchilloService);
  ngOnInit(): void {
      const cuchilloId = this.routes.snapshot.paramMap.get('id');
      this.obtenerCuchillo(cuchilloId);
  }

  obtenerCuchillo(id : string | null){
    this.cuchilloService.getCuchilloId(id).subscribe({
      next: (cuchillo) =>{
        this.cuchillo = cuchillo;
      },
      error: (e : Error) => {
        console.log(e.message);
      }
    })
  }
}
