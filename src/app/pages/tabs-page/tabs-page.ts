import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    templateUrl: 'tabs-page.html'
})
export class TabsPage implements OnInit {

    perfil: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;
    unidade: any;

    vendas: any = [];
    quantidadeCarrinho: any;

    constructor(
        public faribaseService: FirebaseService,
        private firebaseService: FirebaseService,
        private dadosRepositories: DadosRepositories,) {
    }

    ngOnInit(): void {
        this.getDadosUsuario();
        this.carregaVendas();
    }


    getDadosUsuario() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
    }

    async carregaVendas() {
        this.firebaseService.findWhereProductTempUnidade(this.unidade).subscribe(data => {
            this.vendas = data;
            this.quantidadeCarrinho = this.vendas.length;
        })
    }

}
