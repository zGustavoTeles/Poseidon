import { Injectable } from '@angular/core';
@Injectable()
export class TabelasOlimpo {

    constructor() {
    }

    public readonly CREATE_PEDIDO_TEMP = 'CREATE TABLE IF NOT EXISTS "pedido_temp" ('
        + ' "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'
        + ' "tipoOperacaoId" INTEGER,'
        + ' "condicaoPagamentoId" INTEGER,'
        + ' "valorTotal" REAL,'
        + ' "quantidadeItens" INTEGER,'
        + ' "dataPedido" TEXT,'
        + ' "observacaoPedido" INTEGER);';

    public readonly CREATE_IND100_PEDIDO_TEMP = 'CREATE INDEX IND100 ON pedido_temp (id);'

    public readonly CREATE_ITENS_PEDIDO_TEMP = 'CREATE TABLE IF NOT EXISTS "item_pedido_temp" ('
        + ' "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'
        + ' "produtoId" INTEGER,'
        + ' "quantidadeComprada" INTEGER,'
        + ' "valor" REAL);';

    public readonly CREATE_IND200_ITENS_PEDIDO_TEMP = 'CREATE INDEX IND200 ON item_pedido_temp (pedidoTempId);'
    public readonly CREATE_IND202_ITENS_PEDIDO_TEMP = 'CREATE INDEX IND202 ON item_pedido_temp (produtoId);'

}

