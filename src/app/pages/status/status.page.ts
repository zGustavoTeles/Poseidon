import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-status',
    templateUrl: './status.page.html',
    styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
    statusBarbeiro: any;
    status: any;

    barbeiro: any = [];

    perfil: any;
    unidade: any;
    sexo: any;
    documento: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;

    constructor(public dadosRepositories: DadosRepositories,
        public faribaseService: FirebaseService,
        public loadingController: LoadingController,) { }

    ngOnInit() {
        this.getDadosUsuario();
        this.getStatusBarbeiro();
    }

    async atualizaStatusBarbeiro(value: any) {
        this.statusBarbeiro = value.detail.checked;

        if (this.statusBarbeiro)
            this.status = 'ativo';
        else
            this.status = 'inativo';

        let status =
            [{
                "status": this.status
            }];

        this.faribaseService.atualizaStatus(this.documento, status[0])
    }

    async getDadosUsuario() {
        this.documento = this.dadosRepositories.getLocalStorage('documento');
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
    }

    async getStatusBarbeiro() {
        this.faribaseService.getDadosUsuario(this.email).subscribe(data => {
            this.barbeiro = data;

            if (this.barbeiro[0].status === 'ativo')
                this.statusBarbeiro = true;
            else
                this.statusBarbeiro = false;
        })
    }
}
