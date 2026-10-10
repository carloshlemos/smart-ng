import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractCrudService } from 'src/app/core/services/abstract-crud.service';
import { Cliente } from '../cliente/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends AbstractCrudService<Cliente, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}/clientes`)
  }
}
