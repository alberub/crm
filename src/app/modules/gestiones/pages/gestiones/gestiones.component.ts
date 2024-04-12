import { Component } from '@angular/core';
import { TableContactsComponent } from '../../../../shared/components/table-contacts/table-contacts.component';

@Component({
  selector: 'app-gestiones',
  standalone: true,
  imports: [TableContactsComponent],
  templateUrl: './gestiones.component.html',
  styleUrl: './gestiones.component.css'
})
export class GestionesComponent {

}
