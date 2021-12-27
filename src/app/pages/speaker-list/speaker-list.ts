import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
@Component({
    selector: 'page-speaker-list',
    templateUrl: 'speaker-list.html',
    styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage implements OnInit{

    categoria: string;
    produto: string;
    marca: string;
    descricao: any;
    quantidade: number;
    valorDeVenda: number;

    selects: any;

    constructor(
        private faribaseService: FirebaseService
    ) {
        // this.route.params.subscribe((data:any) => {
        //     console.log(data.type);
        //     if(data.type == 'add'){

        //     }
        // })
    }
    ngOnInit(): void {

        this.selects = [{ id: 1, descricao: 'a' }, { id: 3, descricao: 'b' }, { id: 2, descricao: 'c' }];
        // throw new Error('Method not implemented.');
    }

    async addTransation() {
        const record = {
            // categoria: this.categoria,
            // produto: this.produto,
            // marca: this.marca,
            // descricao: this.descricao,
            // quantidade: this.quantidade,
            // valor: this.valor,
        }
        console.log(this.descricao);
        // try {
        //     await this.faribaseService.add_dados('PRODUTOS', dados).then((res: any) => {
        //         console.log(res);
        //     }).catch(erros => {
        //         console.log(erros);
        //     })
        // } catch (error) {
        //     console.log(error);

        // }
    }

    setQuantity(value) {
        this.valorDeVenda = value;
      }

      setCategoria(value) {
        this.categoria = value;
      }

      setDescricao(value) {
        this.descricao = value;
      }

}
