import { Routes } from '@angular/router';
import { ListCuchillosComponent } from './components/list-cuchillos/list-cuchillos.component';
import { AddCuchillosComponent } from './components/add-cuchillos/add-cuchillos.component';
import { DetallesCuchillosComponent } from './components/detalles-cuchillos/detalles-cuchillos.component';
import { UpdateCuchillosComponent } from './components/update-cuchillos/update-cuchillos.component';

export const routes: Routes = [
    {
        path: 'ver-cuchillos',
        component: ListCuchillosComponent
    },
    {
        path: 'agregar-cuchillo',
        component: AddCuchillosComponent
    },
    {
        path: 'detalles/:id',
        component: DetallesCuchillosComponent
    },
    {
        path: 'modificar/:id',
        component: UpdateCuchillosComponent
    }
];
