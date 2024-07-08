import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos = [
    // {conteudo: 'passo informações para o filho',
    //   autoria: 'componente pai',
    //   modelo: 'modelo3'
    // },
    // {conteudo: 'Minha propriedade é decorada com @input',
    //   autoria: 'componente filho',
    //   modelo: 'modelo2'
    // },
    // {conteudo: 'qualquer coisa',
    //   autoria: ' ',
    //   modelo: 'modelo1'
    // }


  ];
  constructor() { }

  ngOnInit(): void {
  }

}
