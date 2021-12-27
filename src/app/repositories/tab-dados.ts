
/**
 * 
 * 
 * 
 * 
 * DADOS DE TABELAS 
 * 
 * 
 * 
 * 
 * 
 *  */ 




/**
 * 
 * *         D A D O S       P A R A          C A D A S T R O      D E          
 * *         U S U A R I O S        P A R A            T E S T E
 * 
 * / */



//  let user =
//  {

//      uid: '',
//      nome: "Isabella Estilete Martinez",
//      sexo: "feminino",
//      celular: "62 9 5566-3655",
//      email: "isabellaestilete@microssoft.com.br",
//      senha: "isabellaestilete1234",
//      perfil: "barbeiro",
//      status: "ativo",
//      whatsapp: "62 9 5566-3655",
//      facebook: "isabellaestilete.fc",
//      instagram: "isabellaestilete.net",
//      twitter: "isabellaestilete.net"

//  };


// await this.angularFire.createUserWithEmailAndPassword(user.email, user.senha).then(function (data) {

//  user.uid = data.user.uid;
//  user.nome = user.nome;
//  user.sexo = user.sexo;
//  user.celular = user.celular;
//  user.email = user.email;

//  user.senha = user.senha;
//  user.perfil = user.perfil;
//  user.status = user.status;
//  user.whatsapp = user.whatsapp;
//  user.facebook = user.facebook;
//  user.instagram = user.instagram;
//  user.twitter = user.twitter;


// })

// console.log(user);
// return (user.uid && await this.firebaseService.add_dados('CLIENTE_01_USUARIOS', user)) ? user.uid : false;



//**________________________________________________________________________________________________________________________________________________________________________________________________________________________________ */


/**
 * 
 * * D A D O S       P A R A      C A D A S T R O
 * 
 * * D E             U S U A R I O S
 * 
 */


//  let dados =
//  {

//      "descricao": 'cliente'

//  };


//  this.firebaseService.add_dados('CLIENTE_01_PERFIS', dados);


//**________________________________________________________________________________________________________________________________________________________________________________________________________________________________ */


// async addTransation() {


        
//     let dados = 
//     [{
//         "id": 92,
//         "nome": "SULFATO HIDROXICLOROQUINA 400MG C/30 CP REV",
//         "nomeGenerico": "SULFATO HIDROXICLOROQUINA   ",
//         "descricaoComercial": "PLAQUINOL - SANOFI",
//         "principioAtivo": "PLAQUINOL - SANOFI",
//         "codigoBarra": "7896004763576",
//         "bula": "",
//         "embalagemVenda": null,
//         "embalagemCompra": null,
//         "farmaciaPopular": null,
//         "unidade": "UN",
//         "peso": 30,
//         "altura": 13,
//         "largura": 35,
//         "comprimento": null,
//         "ipi": 0,
//         "codigoTipoIpi": null,
//         "codigoGrupoProduto": "G",
//         "controlado": 0,
//         "codigoCurva": null,
//         "statusAtivo": 1,
//         "codigoLinha": 11,
//         "codigoMarca": null,
//         "codigoFamilia": null,
//         "promocional": null,
//         "categoria": null,
//         "positivado": null,
//         "percentualMargemVerba": null,
//         "quantidadeCaixa": 56,
//         "resumo": null,
//         "fatorConversao": 1,
//         "fabricanteId": 6,
//         "nomeGrupoProduto": "GENERICOS"
//     
//       }];
      
//    try{   

//       for(let i = 0; i < dados.length; i++){
          
//         this.faribaseService.add_dados('PRODUTOS', dados[i]);

//       }


//     }catch(error) {
//         console.log(error);
//     }
// }

//-----------------------------------------------------------------------------------------------------------------------//


/**
 * CADASTRO DE DADOS DE USUÁRIOS NO FIREBASE
 */


//  await this.angularFire.createUserWithEmailAndPassword(user.email, user.senha).then(function (data) {
//     user.uid = data.user.uid;
//     user.nome = user.nome;
//     user.perfil = user.perfil;
//     user.status = user.status;
//     user.email = user.email;
//     user.senha = user.senha;

//     user.celular = user.celular;
//     user.whatsapp = user.whatsapp;
//     user.facebook = user.facebook;
//     user.instagram = user.instagram;
//     user.twitter = user.twitter;
   
    
// })
// return (user.uid && await this.faribaseService.add_dados('USUARIOS', user)) ? user.uid : false;





/**
 * 
 * --> VALIDA DADOS DE USUÁRIOS CADASTRADOS 
 * NO FIREBASE
 */


            // this.angularFire.signInWithEmailAndPassword(user.email, user.senha).then(res =>{
            //     console.log(res.user.uid);
            //     const lok =this.faribaseService.get(res.user.uid).subscribe(data =>{
            //         console.log(data)
            //     })
            //     }
            //     ).catch(err => {
            //         if(err.message === 'The password is invalid or the user does not have a password.'){
            //             window.alert()

            //         }
            //     });
        





            
// administração {

//     uid: '',
//     nome: "Administração",
//     perfil: "adminstracao",
//     status: "ativo",
//     email: "barbearia@gmail.com",
//     senha: "admin123",
//     celular: "62 9 5566-3655",
//     whatsapp: "62 9 5566-3655",
//     facebook: "adminstracao.fc",
//     instagram: "adminstracao.net",
//     twitter: "adminstracao.net"
    
//     }
    
    
//     funcionário {
    
    
//     uid: '',
//     nome: "José Marques Alves",
//     perfil: "funcionario",
//     status: "ativo",
//     email: "jose@gmail.com",
//     senha: "jose12345",
//     celular: "62 9 5566-3655",
//     whatsapp: "62 9 5566-3655",
//     facebook: "josemarques.fc",
//     instagram: "josemarques.net",
//     twitter: "josemarques.net"
    
//     }
    
//     cliente {
    
//     uid: '',
//     nome: "Mateus Da Silva Alves",
//     perfil: "cliente",
//     status: "ativo",
//     email: "mateus@gmail.com",
//     senha: "mateus12345",
//     celular: "62 9 5566-3655",
//     whatsapp: "62 9 5566-3655",
//     facebook: "mateussilva.fc",
//     instagram: "mateussilva.net",
//     twitter: "mateussilva.net"
    
//     }





/**
 * 
 * --------------->      D A D O S         D E      L I S T A G E M     <----------------------
 * 
 * 
 */




//  <!-- * Div responsavel por apresentar dados do produto -->
//  <div>
//      <div class="produto-listagem">
//          <div>
//              <ion-row>
//                  <ion-col size="3" style="justify-content: space-between;">
//                      <ion-label style="color: var(--ion-color-primary-tint); display: flex;">
//                          <ion-icon *ngIf="produto.statusVencimento === 0 || produto.statusVencimento === 1"
//                              style="padding-right: 5px; font-size: 12px !important;" name="leaf"
//                              [color]="produto.statusVencimento === 1 ? 'success' : 'warning'"></ion-icon>
//                          <ion-icon *ngIf="produto.statusVencimento !== 0 && produto.statusVencimento !== 1"
//                              style="padding-right: 5px; font-size: 12px !important;" name="leaf" color="dark">
//                          </ion-icon>
//                          {{produto.id}}
//                      </ion-label>
//                  </ion-col>
//                  <ion-col size="4">
//                      <ion-label style="color: var(--ion-color-primary);">{{produto.nomeFabricante}}</ion-label>
//                  </ion-col>
//                  <ion-col size="4">
//                      <ion-label style="color: var(--ion-color-azulprofundo-tint);">{{produto.nomeGrupoProduto}}
//                      </ion-label>
//                  </ion-col>
//                  <ion-col size="1" style="text-align: end; padding: 0px;">
//                      <div *ngIf="!produto.estaInseridoPedido" style="color: var(--ion-color-azulprofundo-tint)">
//                          <ion-icon slot="end" name="add-circle-outline" *ngIf="!produto.itemPedidoTempId">
//                          </ion-icon>
//                      </div>
//                      <div *ngIf="produto.estaInseridoPedido">
//                          <ion-icon slot="end" name="checkmark-done-outline" color="success"></ion-icon>
//                      </div>
//                  </ion-col>
//              </ion-row>

//          </div>
//          <div>
//              <ion-label><b>{{produto.nome}}</b></ion-label>
//          </div>
//          <div>
//              <ion-label style="padding-top: 2px; color: steelblue;  display: flex;">
//                  <ion-icon style="padding-right: 5px;" name="flask-outline"></ion-icon>
//                  {{produto.principioAtivo ? produto.principioAtivo : 'PRINCIPIO ATIVO NÃO DECLARADO'}}
//              </ion-label>
//          </div>

//          <!-- * Icone de codigo de barras e preço base -->
//          <div>
//              <ion-label style="padding-top: 2px; color: hsl(194deg 91% 28%); display: flex;">
//                  <ion-icon style="padding-right: 5px;" name="barcode-outline"></ion-icon>
//                  {{produto.codigoBarra ? produto.codigoBarra : 'COD. BARRA NÃO DECLARADO'}}
//              </ion-label>

//              <!-- * Preço do produto fora do pedido -->
//              <ion-label *ngIf="!pedidoTempId && !validaFlagsUtil.ocultaPrecoNaListaPoduto">
//                  Preço: <b style="color: hsl(194deg 91% 28%);">{{produto.preco | currency:'BRL'}}</b>
//              </ion-label>

//              <!-- * Melhor preço do produto dentro do pedido -->
//              <ion-label *ngIf="pedidoTempId && produto.melhorPreco !== undefined">
//                  Preço: <b style="color: hsl(194deg 91% 28%);">{{produto.melhorPreco | currency:'BRL'}}</b>
//              </ion-label>
//          </div>

//          <div *ngIf="promocao">
//              <ion-label style="font-weight: unset; color: brown;">Kit: {{promocao.descricao}}</ion-label>
//          </div>
//          <!-- <div *ngIf="produto.principioAtivo">
//                      <ion-label><b>{{produto.principioAtivo}}</b></ion-label>
//                  </div> -->

//          <!-- * Linha responsavel por apresentar estoque, icones de promoçoes, icone de tabela de preço -->
//          <ion-row>
//              <ion-col *ngIf="!validaFlagsUtil.ocultaEstoqueGeral">

//                  <!-- * Exibe o estoque dos produtos -->
//                  <div *ngIf="!validaFlagsUtil.hideEstoque && !validaFlagsUtil.usaEstoqueAmb">
//                      <ion-badge *ngIf="produto.estoque > 0 && !produto.itemPedidoTempId" color="azulprofundo"
//                          slot="start">
//                          Estoque {{!produto.estoqueTotal ? produto.estoque : produto.estoqueTotal}}
//                          {{produto.unidade}}
//                      </ion-badge>
//                      <ion-badge *ngIf="produto.estoque < 1 && !produto.itemPedidoTempId" color="danger" slot="start">
//                          Estoque {{validaFlagsUtil.defineZeroEmEstoqueNegativo ? 0 : produto.estoque}}
//                          {{produto.unidade}}
//                      </ion-badge>
//                  </div>

//                  <!-- * Esconde o estoque dos produtos; ocultaEstoqueGeral (OL) não quer que exiba nenhuma informação de estoque na tela -->
//                  <div *ngIf="validaFlagsUtil.hideEstoque && !validaFlagsUtil.usaEstoqueAmb">
//                      <ion-badge *ngIf="produto.estoque > 0 && !produto.itemPedidoTempId" color="azulprofundo"
//                          slot="start">
//                          Com Estoque
//                      </ion-badge>
//                      <ion-badge *ngIf="produto.estoque < 1 && !produto.itemPedidoTempId" color="danger" slot="start">
//                          Sem Estoque
//                      </ion-badge>
//                  </div>

//                  <!-- * Estoque via referencia PlusFarma -->
//                  <div *ngIf="validaFlagsUtil.usaEstoqueAmb">
//                      <ion-badge *ngIf="!produto.itemPedidoTempId"
//                          [ngStyle]="{'background-color': produto.estoqueColorAmb}" slot="start"
//                          style="color: white !important; ">
//                          Estoque {{produto.tipoEstoqueAmb}}
//                      </ion-badge>
//                      <!-- <ion-badge *ngIf="produto.estoque < 1 && !produto.itemPedidoTempId"  [ngStyle]="{'color': produto.estoqueColorAmb}"slot="start">
//                          Estoque {{produto.tipoEstoqueAmb}}
//                      </ion-badge> -->
//                  </div>
//              </ion-col>
//              <ion-col>
//                  <div style="font-size: 18px; text-align: center;">
//                      <ion-icon slot="start" name="flame-outline" color="danger" *ngIf="produto.promocional">
//                      </ion-icon>
//                      <ion-icon slot="start" name="thumbs-up-outline" color="azulprofundo" *ngIf="produto.positivado">
//                      </ion-icon>
//                      <ion-icon slot="start" name="star-outline" color="warning" *ngIf="produto.sugestao"></ion-icon>
//                      <ion-icon slot="start" name="trending-up-outline" color="azulprofundo"
//                          *ngIf="produto.temMetaAssociada && produto.temMetaAssociada === 1">
//                      </ion-icon>
//                  </div>
//              </ion-col>
//              <ion-col>
//                  <!-- * Div resposavel por exibir as tabelas de preco na listagem de produtos -->
//                  <div *ngIf="exibePrecoListaProduto && !produto.estaInseridoPedido"
//                      style="font-size: 18px; text-align: end; padding-right: 2px;">
//                      <ion-icon slot="start" name="cash-outline" color="success"
//                          (click)="touchAbreListaTabelaProduto(produto)">
//                      </ion-icon>
//                  </div>
//                  <div *ngIf="exibePrecoListaProduto && produto.estaInseridoPedido"
//                      style="font-size: 18px; text-align: end; padding-right: 2px;">
//                      <ion-icon slot="start" name="cash-outline" color="newgray">
//                      </ion-icon>
//                  </div>
//              </ion-col>
//          </ion-row>

//          <ion-label *ngIf="produto.comparaPoliticaCabecalho && !produto.temPoliticaAssociada"
//              style="color: var(--ion-color-danger);  float: right">
//              <b>*Produto sem política associada</b>
//          </ion-label>

//          <!-- * Div responsavel por apresentar dados na tela de itens do pedido -->
//          <div *ngIf="produto.itemPedidoTempId" id="dadosItemPedidoTemp">

//              <!-- Quantidade e tabela preco -->
//              <div>
//                  <ion-label> Quantidade: {{produto.quantidadeComprada}} un.
//                  </ion-label>
//                  <ion-label *ngIf="produto.tabelaPrecoId !== undefined"> {{produto.tabelaPrecoId}} -
//                      {{produto.descricaoTabelaPreco}}
//                  </ion-label>

//              </div>

//              <!-- Desconto e preco de venda -->
//              <div>
//                  <ion-label *ngIf="produto.percDescontoAplicado" color="tertiary">Desconto:
//                      {{produto.percDescontoAplicado | number}}%
//                  </ion-label>
//                  <ion-label *ngIf="!produto.percDescontoAplicado" color="tertiary">Desconto: 0%
//                  </ion-label>
//                  <ion-label>Preço venda: {{produto.valorLiquidoItem | currency:'BRL'}}</ion-label>
//              </div>

//              <!-- Verbas do produto -->
//              <div>
//                  <span *ngIf="!validaFlagsUtil.usaRentabilidade">
//                      <ion-label color="success"
//                          *ngIf="produto.valorVerbaGerado !== 0 && produto.valorVerbaGerado !== undefined">Verba
//                          Gerada:
//                          {{produto.valorVerbaGerado | currency:'BRL'}}
//                      </ion-label>
//                      <ion-label color="danger"
//                          *ngIf="produto.valorVerbaConsumido !== 0 && produto.valorVerbaConsumido !== undefined">Verba
//                          Consumida:
//                          {{produto.valorVerbaConsumido | currency:'BRL'}}
//                      </ion-label>
//                      <ion-label color="primary"
//                          *ngIf="(produto.valorVerbaGerado === 0 || produto.valorVerbaGerado === undefined) && (produto.valorVerbaConsumido >= 0 || produto.valorVerbaConsumido === undefined)">
//                          Sem verba gerada / consumida!
//                      </ion-label>
//                  </span>

//                  <!-- valorRentabilidadeProduto do produto -->
//                  <span
//                      *ngIf="produto.valorRentabilidadeProduto !== 0 && produto.valorRentabilidadeProduto !== undefined && validaFlagsUtil.usaRentabilidade">
//                      <ion-label color="{{produto.valorRentabilidadeProduto < 0 ? 'danger' : 'success'}}">
//                          Rentabilidade usada: {{produto.valorRentabilidadeProduto | currency:'BRL'}} </ion-label>
//                  </span>

//                  <ion-label *ngIf="produto.valorSt && !validaFlagsUtil.ocultaStRelatorio" color="primary">Valor ST:
//                      {{produto.valorSt
//                      | currency:'BRL'}}
//                  </ion-label>
//                  <ion-label *ngIf="!produto.valorSt && !validaFlagsUtil.ocultaStRelatorio" color="primary">Valor ST:
//                      R$ 0,00
//                  </ion-label>
//              </div>

//              <!-- Valor do produto -->
//              <div>
//                  <span *ngIf="validaFlagsUtil.exibeEstoqueItemPedidoTemp">
//                      <ion-badge *ngIf="produto.estoque == 0" color="danger">Estoque: {{produto.estoque}} UN
//                      </ion-badge>
//                      <ion-badge *ngIf="produto.estoque > 0" color="primary">Estoque: {{produto.estoque}} UN
//                      </ion-badge>
//                  </span>
//                  <span *ngIf="!validaFlagsUtil.exibeEstoqueItemPedidoTemp">
//                      <!-- Manter vazio -->
//                  </span>
//                  <ion-label *ngIf="produto.itemPedidoTempId && !validaFlagsUtil.ocultaStRelatorio" color="success">
//                      <b> Total item + ST: {{produto.precoTotal | currency:'BRL'}} </b>
//                  </ion-label>
//                  <ion-label *ngIf="produto.itemPedidoTempId && validaFlagsUtil.ocultaStRelatorio" color="success">
//                      <b> Total item: {{produto.precoTotal | currency:'BRL'}} </b>
//                  </ion-label>
//              </div>
//              <div *ngIf="produto.dataHoraFim && validaFlagsUtil.exibeVencimentoTabelaPreco">
//                  <span style="color: red;font-size: 10px;">
//                      <ion-label><b> {{ dateUtil.comparacaoDataAtual(produto.dataHoraFim)
//                              ? 'ATENÇÃO - TABELA DE PREÇO VENCE HOJE' :
//                              dateUtil.comparacaoDataAnterior(produto.dataHoraFim)
//                              ? ['TABELA DE PREÇO VENCIDA DESDE: '+ dateUtil.padronizeDate(produto.dataHoraFim)] :
//                              ''}}</b></ion-label>
//                  </span>
//              </div>
//          </div>

//          <!-- Retorno do Pedido -->
//          <div style="padding-bottom: 10px;" *ngIf="exibeRetornoStatusItensPedido">
//              <ion-label class="textoBordaDiv"> Retorno Item </ion-label>
//              <div
//                  style="border: solid 1.0px; border-radius: 10px;padding-bottom: 5px !important; padding-top: 5px !important; font-size: 13px;">
//                  <ion-row style="text-align: center; padding-top: 5px;">
//                      <ion-col>
//                          <ion-label>
//                              <b style="color: tomato;"> Status: </b> <b>
//                                  {{produto.status ? produto.status : 'NÃO DECLARADO'}}</b>
//                          </ion-label>
//                      </ion-col>
//                      <ion-col>
//                          <ion-label>
//                              <b style="color: hsl(194deg 91% 28%);"> Qut. Atendida: </b> <b>
//                                  {{produto.quantidadeFaturada}}
//                                  un. </b>
//                          </ion-label>
//                      </ion-col>

//                      <ion-col>
//                          <ion-label>
//                              <b style="color: #2e7d32;">Valor Un.: </b> <b>
//                                  {{produto.valorUnitario | currency:'BRL'}}
//                              </b>
//                          </ion-label>
//                      </ion-col>
//                  </ion-row>

//                  <ion-row>
//                      <ion-col>
//                          <ion-label style="padding-left: 10px; color:  rgb(0, 92, 99);">
//                              <b> Observação: </b>
//                          </ion-label>
//                          <ion-label style="color:var(--ion-color-dark); display: flex;padding-left: 10px;">
//                              <b> {{produto.observacao ? produto.observacao : 'NÃO DECLARADO'}}
//                              </b>
//                          </ion-label>
//                      </ion-col>
//                  </ion-row>
//              </div>
//          </div>

//      </div>
//  </div>

















/**
 * 
 *                  RELATÓRIOS
 * 
 */


//  <ion-header>
//  <ion-toolbar color="primary">
//    <ion-title>
//      Existem {{arrayFaturas.length}} Faturas
//    </ion-title>
//    <ion-buttons slot="start">
//      <ion-back-button></ion-back-button>
//    </ion-buttons>
//    <ion-buttons slot="end">
//      <ion-button (click)="touchExibleSearchBar()">
//        <ion-icon slot="icon-only" [name]="searchBarVisible ? 'close': 'search'"></ion-icon>
//      </ion-button>
//      <ion-button (click)="touchBuscaFiltroFatura($event)">
//        <ion-icon slot="icon-only" name="funnel-outline"></ion-icon>
//      </ion-button>
//      <ion-button (click)="touchGerarRelatorioFaturas()">
//        <img src="assets/imgs/pdfFile.png" alt="auto" width=20px>
//      </ion-button>
//    </ion-buttons>
//  </ion-toolbar>
//  <!-- Pesquisando positivados por data  -->
//  <ion-row *ngIf="!textoDoFiltro" class="font09em">
//    <ion-col size="5">
//      <ion-input [(ngModel)]="startDate" name="startDate" type="date" color="primary">
//        <ion-icon name="calendar-outline" style="font-size: 2em;"></ion-icon>
//      </ion-input>
//    </ion-col>
//    <ion-col size="5">
//      <ion-input [(ngModel)]="endDate" name="endDate" type="date" color="primary">
//        <ion-icon name="calendar-outline" style="font-size: 2em;"></ion-icon>
//      </ion-input>
//    </ion-col>
//    <ion-col size="2" style="text-align: right;" (click)="touchBuscarPorDataSelecionada()">
//      <ion-icon name="caret-forward-circle-outline" color="primary" style="padding-top: 3px; font-size: 2em;">
//      </ion-icon>
//    </ion-col>
//  </ion-row>
// </ion-header>

// <!-- Novo modo de pesquisa -->
// <div *ngIf="searchBarVisible">
//  <ion-item>
//    <ion-input #search
//      style="text-transform: uppercase; background-color: #5ae24a6b; border-radius: 10px; padding-left: 10px !important;"
//      (keyup.enter)="filtrarItens($event) && keyboard.hide()" [(ngModel)]="textoPesquisa"
//      placeholder="Digite aqui para pesquisar...">
//    </ion-input>
//    <ion-icon *ngIf="textoPesquisa !== ''" slot="end" (click)="filtrarItens(textoPesquisa) && tirarFoco($event)"
//      name="search-outline">
//    </ion-icon>
//  </ion-item>
// </div>

// <ion-item *ngIf="textoDoFiltro || exibeFatura" class="cssDoFiltro">
//  <span [ngStyle]="{'background-color':filtroComecaCom === '' ? 'lightsteelblue' : 'white' }"
//    (click)="touchComecaCom()">
//    <img src="assets/imgs/typography.png" alt="auto" class="img-filtro">
//    <ion-label *ngIf="filtroComecaCom === ''" style="padding-top: 4px; padding-left: 4px;">
//    </ion-label>
//  </span>

//  <p>Filtro:</p>
//  <p class="horizontal-scroll">
//    <ion-chip outline color="danger" *ngIf="textoDoFiltro" (click)="touchLimparFiltros()">
//      <div>
//        <ion-label style="text-transform: uppercase;">{{textoDoFiltro}}</ion-label>
//      </div>
//      <ion-icon name="close-circle"></ion-icon>
//    </ion-chip>
//    <ion-chip outline color="danger" *ngIf="exibeFatura" (click)="touchLimparFiltros()">
//      <div>
//        <ion-label>{{tipoFaturaSelecionado}}</ion-label>
//      </div>
//      <ion-icon name="close-circle"></ion-icon>
//    </ion-chip>
//  </p>
//  <ion-icon slot="end" name="close-circle" (click)="touchLimparFiltros()"></ion-icon>
// </ion-item>

// <ion-content class="ion-no-padding">

//  <!-- Carrgando dados -->
//  <ion-virtual-scroll [items]="listaFaturas" approxItemHeight="81px">
//    <ion-list lines="none" *virtualItem="let item; let itemBounds = bounds;">
//      <ion-item-sliding>
//        <ion-item (click)="touchDetalharClienteSelecionado(item.id)">

//          <div id="produto-listagem-outer" class="produto-listagem-outer">
//            <div class="produto-listagem">
//              <div style="height: 10px !important;">
//                <!-- Manter vazio -->
//              </div>

//              <div>
//                <ion-label style="font-size: 14px;">
//                  <ion-icon name="timer-outline" slot="start" style="padding-right: 5px;"
//                    [ngStyle]="{'color': item.quantidadeDiasSemComprar <= 30 ? '#6ec071' : item.quantidadeDiasSemComprar <= 60 ? '#e0aa06' : '#f44336'}">
//                  </ion-icon><b>{{item.id}} - {{ item.razaoSocial }}</b>
//                </ion-label>
//              </div>

//              <ion-label *ngIf="!item.fantasia">
//                Fantasia: NÃO DECLARADO
//              </ion-label>
//              <ion-label *ngIf="item.fantasia">
//                Fantasia: {{ item.fantasia }}
//              </ion-label>

//              <span style="display: flex;justify-content: space-between; color: rgb(1, 44, 124)">
//                <ion-label>CPF/CNPJ: {{ mascaraUtil.format(item.cpfCnpj) }}
//                </ion-label>
//                <span *ngIf="item.qutCodPagador > 1">
//                  <ion-icon slot="end" name="people-outline"></ion-icon>
//                </span>
//              </span>

//              <span style="text-align: start;display: flex;justify-content: space-between;"
//                *ngIf="item.quantidade1 !== null">
//                <ion-label style="color: red;"><b>Vencidos: {{item.quantidade1}}</b>
//                </ion-label>
//                <ion-label style="color: red;"><b>Valor Total:
//                    {{item.saldo1 | currency: 'BRL'}}</b>
//                </ion-label>
//              </span>
//              <span style="text-align: start;display: flex;justify-content: space-between;"
//                *ngIf="item.quantidade1 === null">
//                <ion-label style="color: red;"><b> {{vencidos}}</b>
//                </ion-label>
//              </span>
//              <span style="text-align: start;display: flex;justify-content: space-between;"
//                *ngIf="item.quantidade !== null && exibeTitulosaVencerDoVendedor ? item.dataVencimento >= startDate : []">
//                <ion-label style="color: rgb(0, 92, 99);"><b>A Vencer: {{item.quantidade}}</b>
//                </ion-label>
//                <ion-label style="color: rgb(0, 92, 99);"><b>Valor Total:
//                    {{item.saldo | currency: 'BRL'}}</b>
//                </ion-label>
//              </span>
//              <span style="text-align: start;display: flex;justify-content: space-between;"
//                *ngIf="item.quantidade === null">
//                <ion-label style="color: rgb(0, 92, 99);"><b> {{aVencer}}</b>
//                </ion-label>
//              </span>

//              <span style="text-align: start;display: flex;justify-content: space-between; padding-bottom: 10px;"
//                *ngIf="item.dataUltimaFatura">
//                <!-- <ion-label style="color: rgb(75 76 92);"> -->
//                <!-- <b>Data Vencimento:
//                {{datasUtil.padronizeDate(item.dataVencimento)}}</b> -->
//                <!-- </ion-label> -->
//                <ion-label style="color:  rgb(75 76 92);"><b>Data Ultima Fat.:
//                    {{datasUtil.padronizeDate(item.dataUltimaFatura)}}</b></ion-label>
//              </span>
//            </div>
//          </div>

//        </ion-item>
//        <ion-item-options side="end">
//          <ion-item-option color="success" *ngIf="item.qutCodPagador > 1 && tipoFaturaSelecionado !== ''"
//            (click)="touchBuscarColigados(item)">
//            <!-- (click)="touchBuscarColigados(item)" -->
//            <ion-icon slot="start" name="people-outline"></ion-icon>
//            Coligados
//          </ion-item-option>
//        </ion-item-options>
//      </ion-item-sliding>
//    </ion-list>
//  </ion-virtual-scroll>

//  <p *ngIf="arrayFaturas.length === 0" style="color: red; text-align: center;">{{mensagemFaturas}}</p>

// </ion-content>

// <ion-footer class="fontNameItem borderFooter" color="primary">

//  <ion-grid style="text-align: center">
//    <ion-row>
//      <ion-col>
//        Total Vencidos <br><b style="color: red;">{{titVencido | currency: 'BRL'}}</b>
//      </ion-col>
//      <ion-col>
//        Total à Vencer <br> <b style="color: forestgreen;">{{titAvencer | currency: 'BRL'}}</b>
//      </ion-col>
//    </ion-row>
//  </ion-grid>

// </ion-footer>









// Cabelo
// Manicure e Pedicure
// Produtos De Beleza
// Bebidas
// Alimentação




/**
 * 
 * * GRID DE INFORMAÇÕES TRABALHADA
 * 
 *  <p style="text-align: center;">
    Produto sem tabela de preço!</p>
  <div>
    <p style="text-align: center;">Selecione uma tabela de preço</p>
    <ion-card *ngFor="let formaDePagamento of formaDePagamentos" style="border-radius: 10px;"
      class="ion-activatable ripple-parent">
      <ion-card-content class="ion-no-padding">
        <ion-grid class="grid-detalhe-produto ion-no-padding" style="padding: 2%;">
          <ion-row class="mensagem-tabela-preco-fixo">
            <ion-label>{{formaDePagamento.descricao}}</ion-label>
          </ion-row>
          <ion-row class="ion-text-left">
            <ion-col>
              <ion-label style="color: rgb(20, 113, 220)">
                <b>Teste </b>
              </ion-label>
            </ion-col>
            <ion-col class="ion-text-right">
              <ion-label position="fixed" color="tertiary">
                <b> Barbearia Barbudos</b>
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-text-left">
              <ion-label position="fixed">Preço Base</ion-label>
              <div>
                <ion-badge color="azulmarinho">{{valorProduto | currency:'BRL'}}</ion-badge>
              </div>
              <ion-label position="fixed">Preço Líquido</ion-label>
              <div>
                <ion-badge color="azulmarinho">{{valorProduto['precoLiquido'] | currency:'BRL'}}</ion-badge>
              </div>
            </ion-col>
            <ion-col class="ion-text-right">
              <ion-label position="fixed">Desconto</ion-label>
              <div>
                <ion-badge color="danger">0,0 %</ion-badge>
              </div>
              <div>
                <ion-badge color="tertiary">{{valorProduto | number: '1.0-4' }}%
                </ion-badge>
              </div>
              <div>
                <ion-badge color="tertiary">
                  {{valorProduto.toFixed(2) | number: '1.0-4' }}%</ion-badge>
              </div>
              <ion-label position="fixed">Estoque</ion-label>
              <div>
                <ion-badge color="danger">{{quantidade}}
                </ion-badge>
                <ion-badge color="tertiary">{{quantidade}}
                </ion-badge>
              </div>
              <ion-label position="fixed">Comissão</ion-label>
              <div>
                <ion-badge color="tertiary">
                  {{valorProduto | number: '1.0-4' }}%</ion-badge>
              </div>
            </ion-col>
          </ion-row>
          <ion-row style="display: block;text-align: center; color: #f44336;">
            <span>Quantidade mínima para essa política: <b>{{quantidade}} unid.</b> </span>
          </ion-row>
        </ion-grid>
      </ion-card-content>
      <!-- Efeito de click -->
      <ion-ripple-effect></ion-ripple-effect>
    </ion-card>
  </div>
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */







              //    let dados2 =
            //         [{
            //             "categoria": this.categoria,
            //             "descricao": this.descricao,
            //             "quantidade": this.estoqueFinal,
            //             "valor": this.valorProduto
            //         }];

            //     this.firebaseService.updateProduto(dados2[0]);





            // const alert = await this.alertController.create({
            //     message: `<img src="assets/img/atencaoin.png" alt="auto"><br><br>
            //     <text>Deseja abrir o carrinho?</text>`,
            //     backdropDismiss: false,
            //     cssClass: "alertaCss",
            //     buttons: [
            //         {
            //             text: 'VOLTAR',
            //             role: 'cancel',
            //             cssClass: 'voltarButton',
            //             handler: () => {
            //                 console.log('Cancelado!');
            //             }
            //         },
            //         {
            //             text: 'ABRIR',
            //             cssClass: 'salvarEnviarButton',
            //             handler: async () => {
            //                 this.router.navigateByUrl('/inserir-produto-carrinho');
            //             },
            //         },
    
            //     ]
            // });
    
            // await alert.present();




            /**
             * * ------------------------------->>>>>> Como pegar o id de um documento no FIREBASE <<<<<<<<<-------------------------------------------------------
             */

            //  async getProducts() {
            //     this.productsCtrl.list(1).subscribe(data => {
            //         this.productsData = [];
            //         data.forEach(row => {
            //             let line = Object(row.payload.doc.data());
            //             line.doc = String(row.payload.doc.id);
        
            //             console.log(line.doc);
                        
            //             this.productsData.push(line);
            //         });
            //     });
            // }


            /**
             * * * ------------------------------->>>>>> Como gravr o id do documento na hora do cadastro no FIREBASE <<<<<<<<<-------------------------------------------------------
             */

            //  var novo_id = firebase.database().ref().child('caminho').push().key;

            //  firebase.database().ref('caminho/' + novo_id).set({
            //         cd_categoria: categoria,
            //         cd_id: novo_id,
            //         ds_descricao: descricao,
            //         ds_nome: nome,
            //         modalidade: "1",
            //         nr_preco: preco
            //  });



                        /**
             * * * ------------------------------->>>>>> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GRÁFICO DE VELAS <<<<<<<<<<<<<<<<<<<<<<<<<<<-------------------------------------------------------
             */

                        //  import { Component, AfterViewInit, ViewChild , ElementRef } from '@angular/core';
                        //  import {Chart, registerables} from 'chart.js'; Chart.register (... registerables);
                         
                        //  @Component({
                        //      selector: 'app-cartao-fidelidade',
                        //      templateUrl: './cartao-fidelidade.page.html',
                        //      styleUrls: ['./cartao-fidelidade.page.scss'],
                        //  })
                        //  export class CartaoFidelidadePage {
                        //      @ViewChild('barChart', { static: false }) private barChart: ElementRef;
                           
                        //      bars: any;
                        //      colorArray: any;
                        //      constructor() { }
                           
                        //      ionViewDidEnter() {
                        //        this.createBarChart();
                        //      }
                           
                        //      createBarChart() {
                        //        this.bars = new Chart(this.barChart.nativeElement, {
                        //          type: 'bar',
                        //          data: {
                        //            labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
                        //            datasets: [{
                        //              label: 'Viewers in millions',
                        //              data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
                        //              backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
                        //              borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
                        //              borderWidth: 1
                        //            }]
                        //          },
                        //          options: {
                        //            scales: {
                        //              // yAxes: [{
                        //                ticks: {
                        //                  beginAtZero: true
                        //                }
                        //              // }]
                        //            }
                        //          }
                        //        });
                        //      }
                        //    }