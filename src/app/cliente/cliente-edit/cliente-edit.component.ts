import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  clienteId;
  cliente: Cliente;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteId = window.localStorage.getItem("editClienteId");
    if (!this.clienteId) {
      alert("Ação inválida.")
      this.router.navigate(['cliente']);
      return;
    }
    
    this.editForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      numeroCPF: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required]
    });

    this.clienteService.findOne(+this.clienteId)
      .subscribe(data => {
        this.editForm.setValue(data);
    });
  }

  onSubmit() {
    this.clienteService.update(+this.clienteId, this.editForm.getRawValue())
      .pipe(first())
      .subscribe(
        data => {
          if(data != null) {
            alert('Cliente updated successfully.');
            this.router.navigate(['cliente']);
          }else {
            alert(data);
          }
        },
        error => {
          alert(error);
        });
  }

}
