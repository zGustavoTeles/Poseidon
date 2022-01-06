import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    collectionName = 'olimpoTrasation'
    constructor(
        private firestore: AngularFirestore,
        private angularFire: AngularFireAuth,
    ) { }

    cadastrarEmpresa(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Unidades").add(dados);
    }

    cadastrarUsuario(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Usuarios").add(dados);
    }

    cadastrarNotificao(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Noticias").add(dados);
    }

    cadastrarGastoDoMes(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Gastos").add(dados);
    }

    cadastrarVale(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Vales").add(dados);
    }

    cadastrarUnidades(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Unidades").add(dados);
    }

    cadastraProdutos(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Produtos").add(dados);
    }

    cadastraVendasProdutosTemp(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Vendas_Produtos_Temp").add(dados);
    }

    cadastraVendasClienteTemp(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Vendas_Cliente_Temp").add(dados);
    }

    cadastraVendasCliente(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Vendas_Cliente").add(dados);
    }

    cadastraVendasProdutos(dados: any) {
        return this.firestore.collection("Barbearia Dos Barbudos " + "_Vendas_Produtos").add(dados);
    }

    // get_dados(collectionName: String) {
    //     return this.firestore.collection(collectionName, raf=).get();
    // }

    atualizaProduto(produtoId: any, dados: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Produtos' + '/' + produtoId).update(dados);
    }

    updateUsuario(usuarioId: any, dados: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Usuarios' + '/' + usuarioId).update(dados);
    }

    atualizaProdutoComanda(produtoId: any, dados: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Vendas_Produtos_Temp' + '/' + produtoId).update(dados);
    }

    atualizaFidelidadeCliente(clienteId: any, dados: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Usuarios' + '/' + clienteId).update(dados);
    }

    atualizaUsuario(usuarioId: any, dados: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Usuarios' + '/' + usuarioId).update(dados);
    }

    deletaVendaProdutoTemp(produtoId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Vendas_Produtos_Temp' + '/' + produtoId).delete();
    }

    deletaVendaProdutos(produtoId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Vendas_Produtos' + '/' + produtoId).delete();
    }

    deletaVendaClienteTemp(vendaId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Vendas_Cliente_Temp' + '/' + vendaId).delete();
    }

    deletaVendaCliente(clienteId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Vendas_Cliente' + '/' + clienteId).delete();
    }

    deletaNotificao(notificaoId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Noticias' + '/' + notificaoId).delete();
    }

    deletaColaborador(colaboradorId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Usuarios' + '/' + colaboradorId).delete();
    }

    deletaCliente(clienteId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Usuarios' + '/' + clienteId).delete();
    }

    deletaProduto(produtoId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Produtos' + '/' + produtoId).delete();
    }

    deletaComanda(comandaId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Vendas_Produtos_Temp' + '/' + comandaId).delete();
    }

    deletaProdutoComanda(comandaId: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Vendas_Produtos_Temp' + '/' + comandaId).delete();
    }

    delete_dados(record_id) {
        this.firestore.doc(this.collectionName + '/' + record_id).delete();
    }

    // get(email: any) {
    //     return this.firestore
    //         .collection("CLIENTE_01_USUARIOS", (ref) => ref.where("email", "==", email)).valueChanges();
    // }


    getUsuario(email: string) {
        return this.firestore

            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("email", "==", email))
            .valueChanges();
    }

    // getUser(

    //     : string) {
    //     return this.firestore
    //         .collection("Usuarios", (ref) => ref.where("uid", "==", uid))
    //         .snapshotChanges();
    // }

    getAllUserForPush() {
        return this.firestore.collection("Usuarios", (ref) => ref.where("tokenPush", ">", "")).snapshotChanges();
    }

    fetch(doc: string) {
        return this.firestore.doc("Usuarios/" + doc).valueChanges();
    }

    // create(user: Usuario) {
    //     delete user.password;
    //     return this.firestore.collection("Usuarios").add(user);
    // }

    list() {
        return this.firestore.collection("PRODUTOS", (ref) => ref.orderBy("nome", "asc")).snapshotChanges();
    }

    listaBarbeiros(unidade: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("unidade", "==", unidade))
            .snapshotChanges();
    }

    listaColaboradores(unidade: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("unidade", "==", unidade))
            .snapshotChanges();
    }

    carregaColaboradores(unidade: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("unidade", "==", unidade))
            .valueChanges();
    }

    buscaInfoColaborador(unidade: any, nome: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("unidade", "==", unidade).where("nome", "==", nome))
            .valueChanges();
    }

    listaColaboradoresValue(unidade: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("unidade", "==", unidade))
            .valueChanges();
    }

    listaColaboradoresSelect() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.orderBy("nome"))
            .snapshotChanges();
    }

    getDadosUsuario(email: string) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("email", "==", email))
            .valueChanges();
    }

    getDadosUsuarioDoc(email: string) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("email", "==", email))
            .snapshotChanges();
    }

    carregaCategorias() {
        return this.firestore
            .collection("Poseidon " + "_Categorias", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    carregaProdutos() {
        return this.firestore
            .collection("Poseidon " + "_Produtos", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    carregaProdutosIdDocumento() {
        return this.firestore
            .collection("Poseidon " + "_Produtos", (ref) => ref.orderBy("descricao"))
            .snapshotChanges();
    }

    carregaVendasTemp() {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente_Temp", (ref) => ref.orderBy("cliente"))
            .snapshotChanges();
    }

    carregaVendasTempUnidade(unidade: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente_Temp", (ref) => ref.where("unidade", "==", unidade))
            .snapshotChanges();
    }

    carregaVendasTempUnidadeCarrinho(unidade: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente_Temp", (ref) => ref.where("unidade", "==", unidade))
            .valueChanges();
    }

    carregaVendasClienteTemp() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Cliente_Temp", (ref) => ref.orderBy("cliente"))
            .valueChanges();
    }

    carregaVendasProdutosFidelidade(cliente: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Produtos", (ref) => ref.where("cliente", "==", cliente)).valueChanges();
    }

    carregaVendasClienteTempInsert(cliente: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente_Temp", (ref) => ref.where("cliente", "==", cliente))
            .valueChanges();
    }

    carregaVendasClienteTempSelect() {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente_Temp", (ref) => ref.orderBy("cliente"))
            .valueChanges();
    }

    carregaVendasProdutosTemp(cliente: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Produtos_Temp", (ref) => ref.where("cliente", "==", cliente))
            .valueChanges();
    }


    carregaVendasProdutosTempDocumento(cliente: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Produtos_Temp", (ref) => ref.where("cliente", "==", cliente))
            .snapshotChanges();
    }

    carregaVendasProdutosTempDoc(cliente: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Produtos_Temp", (ref) => ref.where("cliente", "==", cliente))
            .snapshotChanges();
    }

    carregaVendasProdutosDoc(cliente: any, dataVenda: any, formaDePagamento: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Produtos", (ref) => ref.where("cliente", "==", cliente).where("dataVenda", "==", dataVenda).where("formaDePagamento", "==", formaDePagamento))
            .snapshotChanges();
    }

    carregaVendasCliente(dataInicial: any, dataFinal: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Cliente", (ref) => ref.where('dataVenda', '>=', dataInicial).where('dataVenda', '<=', dataFinal))
            .snapshotChanges();
    }

    carregaVendasClienteRelatorio(dataInicial: any, dataFinal: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Cliente", (ref) => ref.where('dataVenda', '>=', dataInicial).where('dataVenda', '<=', dataFinal))
            .valueChanges();
    }

    carregaVendasClienteRelatorioDoc(dataInicial: any, dataFinal: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Cliente", (ref) => ref.where('dataVenda', '>=', dataInicial).where('dataVenda', '<=', dataFinal))
            .snapshotChanges();
    }

    // carregaVendasClienteRelatorioColaborador(dataInicial: any, dataFinal: any, colaborador: any) {
    //     return this.firestore
    //         .collection("Barbearia Dos Barbudos " + "_Vendas_Cliente", (ref) => ref.where('vendedor', '==', colaborador).where('dataVenda', '>=', dataInicial).where('dataVenda', '<=', dataFinal))
    //         .valueChanges();
    // }

    carregaGastosNoMes(dataInicial: any, dataFinal: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Gastos", (ref) => ref.where('dataDoGasto', '>=', dataInicial).where('dataDoGasto', '<=', dataFinal))
            .valueChanges();
    }

    carregaGastos() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Gastos", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    carregaVales() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vales", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    carregaValesFiltroData(dataInicial: any, dataFinal: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vales", (ref) => ref.where('dataDoVale', '>=', dataInicial).where('dataDoVale', '<=', dataFinal))
            .valueChanges();
    }

    carregaInfoProduto(descricao: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Produtos", (ref) => ref.where("descricao", "==", descricao))
            .valueChanges();
    }

    carregaInfoProdutoDocumento(descricao: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Produtos", (ref) => ref.where("descricao", "==", descricao))
            .snapshotChanges();
    }

    carregaFormasDePagamento() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Formas_De_Pagamentos", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    carregaValorDoProduto(descricao: string) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Produtos", (ref) => ref.where("descricao", "==", + descricao))
            .valueChanges();
    }

    carregaPerfis() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Perfis", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    carregaSexos() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Sexos", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    carregaNoticais(unidade: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Noticias", (ref) => ref.where("unidade", "==", unidade))
            .snapshotChanges();
    }

    atualizaNoticias(notificaoId: any, dados: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Noticias' + '/' + notificaoId).update(dados);
    }

    carregaUnidades(unidade: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Unidades", (ref) => ref.where("nomeDaUnidade", "==", unidade))
            .valueChanges();
    }

    carregaImagens(unidade: any) {
        return this.firestore
            .collection("Barbershop " + "_Imagens", (ref) => ref.where("unidade", "==", unidade))
            .valueChanges();
    }

    carregaUnidadesCadastro() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Unidades", (ref) => ref.orderBy("nomeDaUnidade"))
            .valueChanges();
    }

    carregaBarbeiro(unidade: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Vendas_Cliente_Temp", (ref) => ref.where("unidade", "==", unidade))
            .snapshotChanges();
    }

    listaClientes() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.orderBy("nome"))
            .snapshotChanges();
    }

    carregaInfoCliente(email: any) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("email", "==", email))
            .valueChanges();
    }

    listaClientesCombo() {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Usuarios", (ref) => ref.where("perfil", "==", "Cliente"))
            .valueChanges();
    }

    buscaProduto(descricao: string) {
        return this.firestore
            .collection("Barbearia Dos Barbudos " + "_Produtos", (ref) => ref.where("descricao", "==", + descricao))
            .valueChanges();
    }

    atualizaStatus(documento: any, dados: any) {
        this.firestore.doc('Barbearia Dos Barbudos ' + '_Usuarios' + '/' + documento).update(dados);
    }


    /**
     * *---------------> FIREBASE PRODUTOS <---------------------
     */

    findAllProducts(unidade: any) {
        return this.firestore
            .collection("Poseidon " + "_Produtos", (ref) => ref.where("unidade", "==", unidade))
            .valueChanges();
    }

    findAllProduct(documento: any) {
        return this.firestore
            .collection("Poseidon " + "_Produtos", (ref) => ref.where("documento", "==", documento))
            .valueChanges();
    }

    async deleteProduct(documento: any) {
        this.firestore.doc('Poseidon ' + '_Produtos' + '/' + documento).delete();
    }

    findAllCategory() {
        return this.firestore
            .collection("Poseidon " + "_Categorias", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    findAllFormasPagamento() {
        return this.firestore
            .collection("Poseidon " + "_Formas_De_Pagamento", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    async registerProduct(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Poseidon " + "_Produtos").add(dados).then(async data => {
                    let dadosProdutos =
                        [{
                            "documento": data.id
                        }];
                    this.updateProducts(data.id, dadosProdutos[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    async registerProductCarrinhoTemp(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Zeus " + "_Carrinho_Temp").add(dados).then(async data => {
                    let dadosProdutos =
                        [{
                            "documento": data.id
                        }];
                    this.updateProductCarrinhoTemp(data.id, dadosProdutos[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    async updateProducts(documento: any, dados: any) {
        this.firestore.doc('Poseidon ' + '_Produtos' + '/' + documento).update(dados);
    }

    async updateProductCarrinhoTemp(documento: any, dados: any) {
        this.firestore.doc('Poseidon ' + '' + '/' + documento).update(dados);
    }


    /**
     * *---------------> FIREBASE USUÁRIOS <---------------------
     */

    async updateEmail(youEmail: any, password: any, newEmail: any) {
        this.angularFire.signInWithEmailAndPassword(youEmail, password)
            .then(function (userCredential) {
                userCredential.user.updateEmail(newEmail)
            })
    }

    async updateSenha(youEmail: any, password: any, newPassword: any) {
        this.angularFire.signInWithEmailAndPassword(youEmail, password)
            .then(function (userCredential) {
                userCredential.user.updatePassword(newPassword)
            })
    }

    async registerUser(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Poseidon " + "_Usuários").add(dados).then(async data => {
                    let dadosUsuarios =
                        [{
                            "documento": data.id
                        }];
                    this.updateUsers(data.id, dadosUsuarios[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    public findAllUser(email: any) {
        return this.firestore
            .collection("Poseidon " + "_Usuários", (ref) => ref.where("email", "==", email))
            .valueChanges();
    }

    async updateUsers(documento: any, dados: any) {
        this.firestore.doc('Poseidon ' + '_Usuários' + '/' + documento).update(dados);
    }

    public findAllSexos() {
        return this.firestore
            .collection("Poseidon " + "_Sexos", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    public findAllPerfis() {
        return this.firestore
            .collection("Poseidon " + "_Perfis_De_Usuários", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    public findAllEmpresas() {
        return this.firestore
            .collection("Poseidon " + "_Empresas", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }


    /**
     * *---------------> FIREBASE CARRINHO <---------------------
     */

    async registerSaleClientTemp(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Poseidon " + "_Vendas_Cliente_Temp").add(dados).then(async data => {
                    let dadosVendaCliente =
                        [{
                            "documento": data.id
                        }];
                    this.updateSaleClientTemp(data.id, dadosVendaCliente[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    async updateSaleClientTemp(documento: any, dados: any) {
        this.firestore.doc('Poseidon ' + '_Vendas_Cliente_Temp' + '/' + documento).update(dados);
    }

    public findAllSaleClientTemp(documento: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente_Temp", (ref) => ref.where("documento", "==", documento))
            .valueChanges();
    }

    public findAWhereSaleTemp(unidade: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente_Temp", (ref) => ref.where("unidade", "==", unidade))
            .valueChanges();
    }

    public findWhereSaleClientTemp(cliente: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente_Temp", (ref) => ref.where("cliente", "==", cliente))
            .valueChanges();
    }

    async deleteSaleClientTemp(documento: any) {
        this.firestore.doc('Poseidon ' + '_Vendas_Cliente_Temp' + '/' + documento).delete();
    }

    async registerProductTemp(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Poseidon " + "_Vendas_Produtos_Temp").add(dados).then(async data => {
                    let dadosVendaProduto =
                        [{
                            "documento": data.id
                        }];
                    this.updateProductTemp(data.id, dadosVendaProduto[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    async updateProductTemp(documento: any, dados: any) {
        this.firestore.doc('Poseidon ' + '_Vendas_Produtos_Temp' + '/' + documento).update(dados);
    }

    async deleteProductTemp(documento: any) {
        this.firestore.doc('Poseidon ' + '_Vendas_Produtos_Temp' + '/' + documento).delete();
    }

    public findAllProductTemp(documento: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Produtos_Temp", (ref) => ref.where("documento", "==", documento))
            .valueChanges();
    }

    public findWhereProductTemp(cliente: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Produtos_Temp", (ref) => ref.where("cliente", "==", cliente))
            .valueChanges();
    }

    public findAllPaymentMethods() {
        return this.firestore
            .collection("Poseidon " + "_Formas_De_Pagamento", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    /**
     * *---------------> FIREBASE REGISTRO DE VENDAS <---------------------
     */

    async registerSaleClientVenda(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Poseidon " + "_Vendas_Cliente").add(dados).then(async data => {
                    let dadosVendaCliente =
                        [{
                            "documento": data.id
                        }];
                    this.updateSaleClientVenda(data.id, dadosVendaCliente[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    async updateSaleClientVenda(documento: any, dados: any) {
        this.firestore.doc('Poseidon ' + '_Vendas_Cliente' + '/' + documento).update(dados);
    }

    public findAllSaleClientVenda(documento: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente", (ref) => ref.where("documento", "==", documento))
            .valueChanges();
    }

    async registerProductVenda(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Poseidon " + "_Vendas_Produtos").add(dados).then(async data => {
                    let dadosVendaProduto =
                        [{
                            "documento": data.id
                        }];
                    this.updateProductVenda(data.id, dadosVendaProduto[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    async updateProductVenda(documento: any, dados: any) {
        this.firestore.doc('Poseidon ' + '_Vendas_Produtos' + '/' + documento).update(dados);
    }

    public findAllProductVenda(documento: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Produtos", (ref) => ref.where("documento", "==", documento))
            .valueChanges();
    }

    findAllProductVendaRelatorio(dataInicial: any, dataFinal: any) {
        return this.firestore
            .collection("Poseidon " + "_Vendas_Cliente", (ref) => ref.where('dataVenda', '>=', dataInicial).where('dataVenda', '<=', dataFinal))
            .valueChanges();
    }

    
    /**
     * *---------------> GASTOS CADASTRAIS <---------------------
     */

     findAllSpendingMonth(dataInicial: any, dataFinal: any) {
        return this.firestore
            .collection("Poseidon " + "_Gastos", (ref) => ref.where('dataDoGasto', '>=', dataInicial).where('dataDoGasto', '<=', dataFinal))
            .valueChanges();
    }

}

