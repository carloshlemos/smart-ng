import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styleUrls: ['./cliente-add.component.css']
})
export class ClienteAddComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  } 

  onSubmit() {
    this.clienteService.save(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['cliente']);
      });
  }

}
