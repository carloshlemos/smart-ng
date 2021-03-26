export class Cliente {
    public id: number;
    public nome: string;
    public numeroCPF: string;
    public telefone: string;
    public endereco: string;
  
    constructor(obj: any) {
      Object.assign(this, obj);
    }
  }
  