import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { PageRequest } from '../../core/models/page-request.model';
import { SortDirection } from '../../core/models/sort-direction.enum';
import { Sort } from '../../core/models/sort.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  
  searchClientesCtrl = new FormControl();
  searchResults: Array<Cliente>;

  constructor(private router: Router, 
              private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  searchCliente(): void {
    this.clienteService.findBy('nome', this.searchClientesCtrl.value, new PageRequest(0, 10, new Sort('nome', SortDirection.ASCENDING)))
    .subscribe(
      (data: any) => { this.searchResults = data; },
      error => console.log(error.message)
    );
  }

  addCliente(): void {
    this.router.navigate(['add-cliente']);
  };

  editCliente(cliente: Cliente): void {
    window.localStorage.removeItem("editClienteId");
    window.localStorage.setItem("editClienteId", cliente.id.toString());
    this.router.navigate(['edit-cliente']);
  };

  deleteCliente(cliente: Cliente): void {
    this.clienteService.delete(cliente.id)
      .subscribe( data => {
        this.searchResults = this.searchResults.filter(c => c !== cliente);
      })
  };

}
