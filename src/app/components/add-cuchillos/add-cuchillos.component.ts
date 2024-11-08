import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Cuchillo } from '../../interfaces/cuchillo.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CuchilloService } from '../../services/cuchillo.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-cuchillos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-cuchillos.component.html',
  styleUrl: './add-cuchillos.component.css'
})
export class AddCuchillosComponent {
  @Output()
  emitirCuchillo : EventEmitter<Cuchillo> = new EventEmitter();

  fb = inject(FormBuilder);
  cuchilloService = inject(CuchilloService);

  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    tipoFilo: ['', [Validators.required]],
    materialHoja: ['', [Validators.required]],
    materialMango: ['', [Validators.required]],
    longitudHoja: [0, [Validators.required]],
    longitudTotal: [0, [Validators.required]]
  })

  agregarCuchillo(){
    if(this.formulario.invalid) return ;

    const cuchillo = this.formulario.getRawValue();
    this.agregarCuchilloDb(cuchillo);
    this.emitirCuchillo.emit(cuchillo);
  }
  
  agregarCuchilloDb(cuchillo : Cuchillo){
    this.cuchilloService.postCuchillos(cuchillo).subscribe({
      next: () =>{
        alert('Cuchillo agregado...')
      },
      error: (e : Error) =>{
        console.log(e.message);
      }
    })
  }
  
}
