import { Pensamento } from './../pensamento/pensamento';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaPensamentos) => {
      console.log('Pensamentos iniciais:', listaPensamentos);
      this.listaPensamentos = listaPensamentos;
      if (listaPensamentos.length < 6) {
        this.haMaisPensamentos = false;
      }
      console.log('haMaisPensamentos:', this.haMaisPensamentos);
    });
  }

  carregarMaisPensamentos() {
    console.log('Carregar mais pensamentos - Página atual:', this.paginaAtual);
    this.service.listar(++this.paginaAtual, this.filtro)
      .subscribe(listaPensamentos => {
        console.log('Mais pensamentos carregados:', listaPensamentos);
        const novosIds = listaPensamentos.map(p => p.id);
        const idsCarregados = this.listaPensamentos.map(p => p.id);
        const idsDuplicados = novosIds.filter(id => idsCarregados.includes(id));

        if (idsDuplicados.length > 0) {
          console.warn('Pensamentos duplicados detectados:', idsDuplicados);
          this.haMaisPensamentos = false; // Parar de carregar mais se encontrar duplicados
        } else {
          this.listaPensamentos.push(...listaPensamentos);
        }

        console.log('IDs carregados até agora:', idsCarregados.concat(novosIds));
        if (!listaPensamentos.length || listaPensamentos.length < 6) {
          this.haMaisPensamentos = false;
        }
        console.log('haMaisPensamentos após carregar mais:', this.haMaisPensamentos);
      });
  }

  pesquisarPensamentos() {

    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro)
     .subscribe(listaPensamentos => { this.listaPensamentos = listaPensamentos
      });
  }
}
