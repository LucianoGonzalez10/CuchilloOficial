import { Component, inject, OnInit } from '@angular/core';
import { Cuchillo } from '../../interfaces/cuchillo.interface';
import { CuchilloService } from '../../services/cuchillo.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-cuchillos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-cuchillos.component.html',
  styleUrl: './list-cuchillos.component.css'
})
export class ListCuchillosComponent implements OnInit{
  ngOnInit(): void {
      this.listarCuchillos();
  }

  listaCuchillos : Cuchillo[] = [];
  cuchilloService = inject(CuchilloService);

  listarCuchillos(){
    this.cuchilloService.getCuchillos().subscribe({
      next: (cuchillo : Cuchillo[]) =>{
        this.listaCuchillos = cuchillo;
      },
      error: (e: Error) =>{
        console.log(e.message);
      }
    })
  }

  eliminarCuchillo(id : number | undefined){
    this.cuchilloService.deleteCuchillo(id).subscribe({
      next: () =>{
        this.listarCuchillos();
      },
      error: (e : Error) =>{
        console.log(e.message);
      }
    })
  }
}
