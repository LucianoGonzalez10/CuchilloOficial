import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CuchilloService } from '../../services/cuchillo.service';
import { Cuchillo } from '../../interfaces/cuchillo.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-cuchillos',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-cuchillos.component.html',
  styleUrl: './update-cuchillos.component.css'
})
export class UpdateCuchillosComponent implements OnInit{
  constructor(private routes : ActivatedRoute){}

  cuchillo : any;
  cuchilloId : string | null = null; 

  ngOnInit(): void {
    this.cuchilloId = this.routes.snapshot.paramMap.get('id');
    this.cuchillo = this.obtenerCuchillo(this.cuchilloId);
  }

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

  obtenerCuchillo(id : string | null){
    this.cuchilloService.getCuchilloId(id).subscribe({
      next: (cuchillo : Cuchillo) =>{
        this.cuchillo = cuchillo;
        this.formulario.patchValue(cuchillo)
      },
      error: (e : Error) => {
        console.log(e.message);
      }
    })
  }

  modificarCuchillo(){
    if(this.formulario.invalid) return ;
    
    const cuchillo = this.formulario.getRawValue();
    this.modificarCuchilloDb(cuchillo, this.cuchilloId)
    this.emitirCuchillo.emit(cuchillo);
  }


  modificarCuchilloDb(cuchillo : Cuchillo, id : string | null){
    this.cuchilloService.putCuchillo(id, cuchillo).subscribe({
      next: () =>{
        alert('Cuchillo Modificado');
      },
      error(e : Error) {
          console.log(e.message);
      },
    })
  }
}
