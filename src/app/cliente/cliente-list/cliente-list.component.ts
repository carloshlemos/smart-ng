import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/core/models/page.model';
import { PageRequest } from '../../core/models/page-request.model';
import { SortDirection } from '../../core/models/sort-direction.enum';
import { Sort } from '../../core/models/sort.model';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  searchClientesCtrl = new FormControl();
  clientesLoading = false;
  searchResults: Observable<Page<Cliente>>

  page = 0;
  pageSize = 10;
  loadingTable = false;

  constructor(private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  searchCliente(): void {
    this.clienteService.findBy({ 'nome': this.searchClientesCtrl.value },
      new PageRequest(this.page, this.pageSize, new Sort('nome',
        Sort.from('nome', SortDirection.ASCENDING).direction))).subscribe(resp => {
          if (resp.body.length == 0) {
            console.log('Não foram encontrados dados para a consulta realizada!');
          }
          this.searchResults = resp.body;
        }, (err) => {
          if (err.error.status === 500) {
            console.log(`Status ${err.error.status}}`);
          } else {
            console.log(`Status ${err.error.status}}`);
          }
          this.loadingTable = false;
        });
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
      .subscribe(data => {
        //this.searchResults = this.searchResults.filter(c => c !== cliente);
      })
  };

}
